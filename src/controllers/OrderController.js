const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
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
            payDate,
            payActive,
            deliverDate,
            deliverActive,
            user,
            shipmentCode,
        } = req.body;
        console.log('req.body', req.body);

        // Kiểm tra các trường bắt buộc
        if (orderItems===null || phone===null ||
            name===null ||
            specificAddress===null ||
            province===null ||
            district===null ||
            commune===null ||
            paymentMethod===null ||
            itemsPrice===null ||
            shippingPrice===null ||
            discount===null ||
            totalMoney===null ||
            user===null) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Missing required fields',
            });
        }


        const response = await OrderService.createOrder(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error creating order',
            error: e.message,
        });
    }
};
const getAllOrder = async (req, res) => {
    const { user } = req.query;  // Lấy user từ query
    try {
        const response = await OrderService.getAllOrder(user); // Nếu không có user, truyền undefined
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


const getDetailOrder = async (req, res) => {
    try {
        const OrderID=req.params.id
        if (!OrderID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The OrderID is required'
            });
        }
        const response = await OrderService.getDetailOrder(OrderID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateActiveNow = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    console.log('Received activeNow in controller:', data); // Log dữ liệu nhận được từ frontend

    try {
        // Gọi service
        const response = await OrderService.updateActiveNow(id, data);

        if (response.status === 'OK') {
            return res.status(200).json({
                message: response.message,
                order: response.data,
                emailSent: response.emailSent,
                emailError: response.emailError,
            });
        } else {
            return res.status(400).json({
                message: response.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Something went wrong while updating the order.',
        });
    }
};

  
  const updateIsCancel = async (req, res) => {
    const { id } = req.params;  // Lấy orderId từ URL

    try {
        // Gọi service để cập nhật 'isCancel' thành true
        const updatedOrder = await OrderService.updateIsCancel(id);

        return res.status(200).json({
            status: 'OK',
            message: 'Order isCancel updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'Error updating isCancel',
        });
    }
};

const toggleFeedbackStatus = async (req, res) => {
    const { orderId, productId } = req.params;
console.log(orderId, productId)
    try {
        const updatedOrder = await OrderService.toggleFeedbackStatus(orderId, productId);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order or product not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error toggling feedback status:', error);
        res.status(500).json({ message: 'An error occurred while updating feedback status' });
    }
};

module.exports = {
    toggleFeedbackStatus,
    createOrder, getDetailOrder, getAllOrder, updateActiveNow, updateIsCancel
};
