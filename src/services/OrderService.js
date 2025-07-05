const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");

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
        // Tìm order và populate user để lấy email
        const order = await Order.findById(orderId).populate('user');
        const testEmail = 'kimnganvo560@gmail.com';

        if (!order) {
            throw new Error('Order not found');
        }

        console.log('Received data:', data);

        // Xử lý data: lấy active từ payload
        const { active: activeNowValue, date } = data;
        if (!activeNowValue) {
            throw new Error('Invalid data format: active is required');
        }

        // Cập nhật trạng thái và ngày
        order.activeNow = activeNowValue;
        if (date) {
            order.date = date; // Cập nhật date nếu có
        }
        await order.save();

        // Kiểm tra email từ user
        if (!order.user || !order.user.email) {
            throw new Error('Email not found for this order');
        }

        // Cấu hình transporter cho Brevo SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 2525,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: { rejectUnauthorized: false },
        });

        // Gửi email
        const mailOptions = {
           from: `"Bookish xin chào" <${process.env.EMAIL_FROM}>`,
            to: order.user.email, // Lấy email từ user
            subject: `Cập nhật trạng thái đơn hàng #${orderId}`,
            text: `Kính gửi khách hàng,\n\nTrạng thái đơn hàng #${orderId} của bạn đã được cập nhật thành: ${activeNowValue}.\n\nTrân trọng,\nĐội ngũ hỗ trợ`,
            html: `<p>Kính gửi khách hàng,</p><p>Trạng thái đơn hàng #${orderId} của bạn đã được cập nhật thành: <strong>${activeNowValue}</strong>.</p><p>Trân trọng,<br>Đội ngũ hỗ trợ</p>`,
        };

        let emailSent = false;
        let emailError = null;
        try {
            await transporter.sendMail(mailOptions);
            emailSent = true;
            console.log(`Email sent successfully to ${order.user.email} for order #${orderId}`);
        } catch (emailError) {
            emailError = emailError.message;
            console.error('Error sending email:', emailError);
        }

        // Trả về response
        const response = {
            status: 'OK',
            message: 'Order updated successfully',
            data: order,
            emailSent: emailSent,
            emailError: emailError,
        };

        console.log('Update response:', response);
        return response;
    } catch (error) {
        console.error('Error updating activeNow:', error);
        return {
            status: 'ERR',
            message: 'Error updating activeNow: ' + error.message,
        };
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
