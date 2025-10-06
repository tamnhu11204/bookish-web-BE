const Product = require('../models/ProductModel');

// Tạo sản phẩm
const createProduct = async (newProduct) => {
    try {
        const { code,
            name, author, publishDate, weight, height, width, length, page, description, price,
            discount, stock, img, star, favorite, view, publisher, language, format, unit, category, supplier,isDeleted,
        deletedAt
        } = newProduct;

        // Kiểm tra sản phẩm đã tồn tại
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return {
                status: 'FAIL',
                message: 'The product name already exists',
            };
        }


        // Tạo sản phẩm mới
        const createdProduct = await Product.create(newProduct);
        return {
            status: 'OK',
            message: 'Product created successfully',
            data: createdProduct,
        };
    } catch (e) {
        console.error('Error creating product:', e);
        throw { status: 'ERROR', message: 'Error creating product', error: e.message };
    }
};

// Cập nhật sản phẩm
const updateProduct = async (id, data) => {
    try {
        if (data.img && !Array.isArray(data.img)) {
            data.img = [data.img];
        }

        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }
        return {
            status: 'OK',
            message: 'Product updated successfully',
            data: product,
        };
    } catch (e) {
        console.error('Error updating product:', e);
        throw { status: 'ERROR', message: 'Error updating product', error: e.message };
    }
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }
        return {
            status: 'OK',
            message: 'Product deleted successfully',
        };
    } catch (e) {
        console.error('Error deleting product:', e);
        throw { status: 'ERROR', message: 'Error deleting product', error: e.message };
    }
};

const getAllProduct = async (limit = 0, page = 0, sort, filter) => {
    try {
        const query = {};

        // Logic lọc sản phẩm
        if (filter && Array.isArray(filter) && filter.length === 2) {
            const [field, value] = filter;
            if (field === "author" || field === "category") {
                query[field] = value;
            } else {
                query[field] = { $regex: value, $options: "i" };
            }
        }

        // Logic sắp xếp
        let sortOption = {};
        if (sort) {
            const sortArray = typeof sort === "string" ? JSON.parse(sort) : sort;
            if (Array.isArray(sortArray) && sortArray.length === 2) {
                sortOption[sortArray[0]] = sortArray[1];
            }
        }

        // Tính tổng số sản phẩm
        const totalProduct = await Product.countDocuments(query);

        // Lấy sản phẩm
        let queryBuilder = Product.find(query).sort(sortOption).populate("author").populate("category");

        // Chỉ áp dụng limit và skip nếu limit > 0
        if (limit > 0) {
            queryBuilder = queryBuilder.limit(limit).skip(page * limit);
        }

        const products = await queryBuilder;

        return {
            status: "OK",
            message: "Products retrieved successfully",
            data: products,
            total: totalProduct,
            pageCurrent: limit > 0 ? page + 1 : 1, // Nếu không có limit, pageCurrent là 1
            totalPage: limit > 0 ? Math.ceil(totalProduct / limit) : 1, // Nếu không có limit, totalPage là 1
        };
    } catch (e) {
        console.error("SERVICE ERROR - getAllProduct:", e);
        throw new Error(e.message);
    }
};

// Lấy chi tiết sản phẩm
const getDetailProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }

        return {
            status: 'OK',
            message: 'Product details retrieved successfully',
            data: product,
        };
    } catch (e) {
        console.error('Error retrieving product details:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error retrieving product details', error: e.message };
    }
};

const updateProductRating = async (productId, newRating) => {
    if (newRating < 1 || newRating > 5) {
        throw new Error('Số sao phải nằm trong khoảng từ 1 đến 5.');
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    // Cập nhật tổng số sao và số lượt đánh giá
    product.feedbackCount += 1;
    product.star = (product.star + newRating) / product.feedbackCount; // Ví dụ tính trung bình

    await product.save();

    return product;
};

const updateProductRating2 = async (productId, newRating, oldRating) => {
    if (newRating < 1 || newRating > 5) {
        throw new Error('Số sao mới phải nằm trong khoảng từ 1 đến 5.');
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    if (oldRating < 0 || oldRating > 5) {
        throw new Error('Số sao cũ phải nằm trong khoảng từ 0 đến 5.');
    }

    const { star, feedbackCount } = product;

    const totalStars = star * feedbackCount;
    const updatedTotalStars = totalStars - oldRating + newRating;
    product.star = updatedTotalStars / feedbackCount;

    await product.save();

    return product;
};

const deleteRating = async (productId, rating) => {
    if (rating < 1 || rating > 5) {
        throw new Error('Số sao mới phải nằm trong khoảng từ 1 đến 5.');
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    const { star, feedbackCount } = product;
    product.feedbackCount = feedbackCount - 1
    const totalStars = star * product.feedbackCount;
    const updatedTotalStars = totalStars - rating;
    product.star = updatedTotalStars / product.feedbackCount;

    await product.save();

    return product;
};

const updateView = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    product.view = product.view + 1
    await product.save();

    return product;
};

// Cập nhật số lượng tồn kho của sản phẩm
const updateProductStock = async (id, quantityChange) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }

        // Cập nhật stock mới
        product.stock += quantityChange;

        // Đảm bảo stock không âm
        if (product.stock < 0) {
            return {
                status: 'FAIL',
                message: 'Stock cannot be negative',
            };
        }

        const updatedProduct = await product.save();
        return {
            status: 'OK',
            message: 'Product stock updated successfully',
            data: updatedProduct,
        };
    } catch (e) {
        console.error('Error updating product stock:', e);
        throw { status: 'ERROR', message: 'Error updating product stock', error: e.message };
    }
};

// Xóa mềm sản phẩm
const softDeleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }

        if (product.isDeleted) {
            return {
                status: 'FAIL',
                message: 'Product already soft deleted',
            };
        }

        product.isDeleted = true;
        product.deletedAt = new Date();
        await product.save();

        return {
            status: 'OK',
            message: 'Product soft deleted successfully',
            data: product,
        };
    } catch (e) {
        console.error('Error soft deleting product:', e);
        throw { status: 'ERROR', message: 'Error soft deleting product', error: e.message };
    }
};

module.exports = {
    updateProductRating,
    deleteRating,
    updateProductRating2,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
    updateView,
    updateProductStock,
    softDeleteProduct,
};
