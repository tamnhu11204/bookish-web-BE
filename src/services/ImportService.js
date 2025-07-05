const Import = require("../models/ImportModel"); // Đường dẫn đến model Import
const Product = require("../models/ProductModel"); // Đường dẫn đến model Product

// Tạo một lần nhập hàng mới
const createImport = async (newImport) => {
    try {
        const {
            importItems,
            supplier,
            importDate,
            totalImportPrice,
            note,
            user,
            status
        } = newImport;

        const session = await Import.startSession();
        session.startTransaction();

        try {
            // Cập nhật tồn kho cho từng sản phẩm trong importItems
            for (const item of importItems) {
                const { product, quantity } = item;

                // Tìm sản phẩm và kiểm tra stock
                const productItem = await Product.findOne({ _id: product }).session(session);
                if (!productItem) {
                    throw new Error(`Sản phẩm ${product} không tồn tại.`);
                }

                // Nếu stock là null, đặt thành 0 trước khi tăng
                if (productItem.stock === null) {
                    await Product.updateOne(
                        { _id: product },
                        { $set: { stock: 0 } },
                        { session }
                    );
                }

                // Tăng stock
                const updatedProduct = await Product.findOneAndUpdate(
                    { _id: product },
                    { $inc: { stock: +quantity } },
                    { new: true, session }
                );

                if (!updatedProduct) {
                    throw new Error(`Không thể cập nhật tồn kho cho sản phẩm ${product}.`);
                }
            }

            // Tạo bản ghi nhập hàng mới
            // Nếu không có code, tạo mã tự động (ví dụ: mã theo thời gian)
if (!newImport.code) {
    const timestamp = Date.now();
    newImport.code = `IMP${timestamp}`; // Ví dụ: IMP1720094391234
}

            const createdImport = await Import.create([newImport], { session });

            // Hoàn tất transaction
            await session.commitTransaction();
            session.endSession();

            return {
                status: 'OK',
                message: 'Nhập hàng được tạo thành công',
                data: createdImport,
            };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error('Lỗi khi tạo nhập hàng:', error.message, error.stack);
        throw {
            status: 'ERROR',
            message: 'Lỗi khi tạo nhập hàng. Vui lòng kiểm tra lại dữ liệu đầu vào.',
            error: error.message,
        };
    }
};



// Lấy tất cả các lần nhập hàng
const getAllImports = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = userId ? { user: userId } : {}; // Lọc theo user nếu có
            const allImports = await Import.find(query)
                .populate('importItems.product')
                .populate('supplier')
                .populate('user');
            resolve({
                status: 'OK',
                message: 'Success',
                data: allImports,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy chi tiết một lần nhập hàng
const getImportById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const importOrder = await Import.findOne({ _id: id })
                .populate('importItems.product')
                .populate('supplier')
                .populate('user');
            if (!importOrder) {
                resolve({
                    status: 'OK',
                    message: 'The Import is not defined'
                });
            }

            resolve({
                status: 'OK',
                message: 'Get detail Import successfully',
                data: importOrder
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Cập nhật trạng thái của lần nhập hàng
const updateImportStatus = async (importId, status) => {
    try {
        const importOrder = await Import.findById(importId);

        if (!importOrder) {
            throw new Error('Import not found');
        }

        if (!['pending', 'completed', 'canceled'].includes(status)) {
            throw new Error('Invalid status value');
        }

        // Nếu hủy nhập hàng, hoàn lại tồn kho
        if (status === 'canceled' && importOrder.status !== 'canceled') {
            for (const item of importOrder.importItems) {
                const { product, quantity } = item;
                const productItem = await Product.findByIdAndUpdate(
                    product,
                    { $inc: { stock: -quantity } }, // Giảm tồn kho về như cũ
                    { new: true }
                );

                if (!productItem) {
                    throw new Error(`Product ${product} not found`);
                }
            }
        }

        const updatedImport = await Import.findByIdAndUpdate(
            importId,
            { status },
            { new: true }
        );

        return {
            status: 'OK',
            message: 'Import status updated successfully',
            data: updatedImport
        };
    } catch (error) {
        throw new Error(`Error updating import status: ${error.message}`);
    }
};

// Xóa một lần nhập hàng
const deleteImport = async (id) => {
    try {
        const session = await Import.startSession();
        session.startTransaction();

        try {
            // Tìm lần nhập hàng cần xóa
            const importToDelete = await Import.findById(id).session(session);
            if (!importToDelete) {
                throw new Error('Không tìm thấy lần nhập hàng để xóa.');
            }

            // Giảm stock cho từng sản phẩm trong importItems
            for (const item of importToDelete.importItems) {
                const { product, quantity } = item;

                // Tìm sản phẩm
                const productItem = await Product.findById(product).session(session);
                if (!productItem) {
                    throw new Error(`Sản phẩm ${product} không tồn tại.`);
                }

                // Đảm bảo stock không âm
                const newStock = productItem.stock - quantity;
                if (newStock < 0) {
                    throw new Error(`Không thể xóa: Số lượng tồn kho của sản phẩm ${productItem.name} sẽ âm (${newStock}).`);
                }

                // Giảm stock
                await Product.findByIdAndUpdate(
                    product,
                    { $inc: { stock: -quantity } },
                    { session }
                );
            }

            // Xóa lần nhập hàng
            await Import.findByIdAndDelete(id).session(session);

            // Hoàn tất transaction
            await session.commitTransaction();
            session.endSession();

            return {
                status: 'OK',
                message: 'Xóa lần nhập hàng thành công',
            };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        throw {
            status: 'ERROR',
            message: 'Lỗi khi xóa lần nhập hàng',
            error: error.message,
        };
    }


};

// Cập nhật một lần nhập hàng
const updateImport = async (importId, updatedImport) => {
    try {
      const session = await Import.startSession();
      session.startTransaction();
  
      try {
        // Tìm lần nhập hàng hiện tại
        const existingImport = await Import.findById(importId).session(session);
        if (!existingImport) {
          throw new Error('Không tìm thấy lần nhập hàng để cập nhật.');
        }
  
        const { importItems: newItems, totalImportPrice } = updatedImport;
  
        // So sánh và cập nhật tồn kho dựa trên sự thay đổi số lượng
        for (let i = 0; i < newItems.length; i++) {
          const newItem = newItems[i];
          const oldItem = existingImport.importItems[i];
  
          if (!oldItem) {
            throw new Error('Dữ liệu không hợp lệ: Số lượng mục nhập không khớp.');
          }
  
          const productId = newItem.product;
          const oldQuantity = oldItem.quantity;
          const newQuantity = newItem.quantity;
          const quantityChange = newQuantity - oldQuantity; // Sự thay đổi số lượng
  
          // Tìm sản phẩm để kiểm tra và cập nhật tồn kho
          const product = await Product.findById(productId).session(session);
          if (!product) {
            throw new Error(`Sản phẩm ${productId} không tồn tại.`);
          }
  
          // Đảm bảo tồn kho không âm
          const newStock = product.stock + quantityChange;
          if (newStock < 0) {
            throw new Error(
              `Không thể cập nhật: Số lượng tồn kho của sản phẩm ${product.name} sẽ âm (${newStock}).`
            );
          }
  
          // Cập nhật tồn kho
          await Product.findByIdAndUpdate(
            productId,
            { $inc: { stock: quantityChange } },
            { session }
          );
        }
  
        // Cập nhật lần nhập hàng
        const updatedImportRecord = await Import.findByIdAndUpdate(
          importId,
          {
            importItems: newItems.map(item => ({
              product: item.product,
              importPrice: item.importPrice,
              quantity: item.quantity,
            })),
            totalImportPrice,
          },
          { new: true, session }
        )
          .populate('importItems.product')
          .populate('supplier')
          .populate('user');
  
        // Hoàn tất transaction
        await session.commitTransaction();
        session.endSession();
  
        return {
          status: 'OK',
          message: 'Cập nhật lần nhập hàng thành công',
          data: updatedImportRecord,
        };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      throw {
        status: 'ERROR',
        message: 'Lỗi khi cập nhật lần nhập hàng',
        error: error.message,
      };
    }
  };

module.exports = {
    createImport,
    getAllImports,
    getImportById,
    updateImportStatus,
    deleteImport,
    updateImport
};