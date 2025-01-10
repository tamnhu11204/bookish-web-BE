const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

// Tạo sản phẩm
const createOrder = async (newOrder) => {
    try {
        const {
            orderItems,       
            phone,           
            name,             
            specificAddress,  
            province,        
            district,       
            commune,          
            paymentMethod,   
            itemsPrice,       
            shippingPrice,    
            discount,       
            totalMoney,       
            note,             
            user,           
            activeNow,     
        } = newOrder;

        const session = await Order.startSession(); 
        session.startTransaction();

        try {
            for (const item of orderItems) {
                const { product, amount } = item;

                const productItem = await Product.findOneAndUpdate(
                    {
                        _id: product,            
                        stock: { $gte: amount },    
                    },
                    {
                        $inc: {
                            stock: -amount,        
                            sold: +amount,     
                        },
                    },
                    {
                        new: true,                 
                        session,                   
                    }
                );

                if (!productItem) {
                    throw new Error(`Sản phẩm ${product} không đủ số lượng tồn kho.`);
                }
            }

            // Tạo đơn hàng mới
            const createdOrder = await Order.create([newOrder], { session });

            // Hoàn tất transaction
            await session.commitTransaction();
            session.endSession();

            return {
                status: 'OK',
                message: 'Đơn hàng được tạo thành công',
                data: createdOrder,
            };
        } catch (error) {
            await session.abortTransaction(); 
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error.message, error.stack);  
throw {
    status: 'ERROR',
    message: 'Lỗi khi tạo đơn hàng. Vui lòng kiểm tra lại dữ liệu đầu vào hoặc tồn kho.',
    error: error.message,
};

    }
};


const getAllOrder = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = userId ? { user: userId } : {}; // Nếu không có user, không lọc
            const allOrder = await Order.find(query);
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const order = await Order.findOne({ _id: id })
            if (order === null) {
                resolve({
                    status: 'OK',
                    message: 'The Order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail Order sucessfully',
                data: order
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateActiveNow = async (orderId, data) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        console.log('Received activeNow:', data);

        const activeNowValue = Object.keys(data)[0];

        if (!activeNowValue) {
            throw new Error('Invalid data format');
        }
        order.activeNow = activeNowValue;

        await order.save();

        return order;
    } catch (error) {
        throw new Error('Error updating activeNow: ' + error.message);
    }
};

const updateIsCancel = async (orderId) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        for (const item of order.orderItems) {
            const { product, amount } = item;
            const productItem = await Product.findByIdAndUpdate(
                product,
                {
                    $inc: {
                        stock: +amount, 
                        sold: -amount,  
                    },
                },
                { new: true }
            );

            if (!productItem) {
                throw new Error(`Product ${product} not found`);
            }
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { isCancel: true },
            { new: true }
        );

        if (!updatedOrder) {
            throw new Error('Error updating order cancel status');
        }

        return updatedOrder;
    } catch (error) {
        throw new Error(`Error updating 'isCancel': ${error.message}`);
    }
};


const toggleFeedbackStatus = async (orderId, productId) => {
    try {
        const order = await Order.findOne({ _id: orderId, 'orderItems.product': productId });

        if (!order) {
            return null; 
        }

        const itemIndex = order.orderItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return null;
        }

        // Đổi trạng thái isFeedback
        order.orderItems[itemIndex].isFeedback = !order.orderItems[itemIndex].isFeedback;
        await order.save();

        return order; 
    } catch (error) {
        console.error('Error in toggleFeedbackStatus service:', error);
        throw error;
    }
};


module.exports = {
    toggleFeedbackStatus,
    createOrder, getDetailOrder, getAllOrder, updateActiveNow, updateIsCancel
};
