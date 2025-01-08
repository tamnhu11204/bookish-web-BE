const OrderActiveListService = require('../services/OrderActiveListService');

const createOrderActiveList = async (req, res) => {
    try {
        const { order, activeList } = req.body;

        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (!order || !activeList) {
            resolve({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin!'
            })
        }

        const response = await OrderActiveListService.createOrderActiveList(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllOrderActiveList = async (req, res) => {
    try {
        const { order } = req.query;  
        
        if (!order) {
            return res.status(400).json({ message: "orderId is required" });
        }

        const response = await OrderActiveListService.getAllOrderActiveList(order);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message,
        });
    }
};


const getDetailOrderActiveList = async (req, res) => {
    try {
        const OrderActiveListID=req.params.id
        if (!OrderActiveListID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The OrderActiveListID is required'
            });
        }
        const response = await OrderActiveListService.getDetailOrderActiveList(OrderActiveListID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateOrderActiveList = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { orderId } = req.params;
        const { active, date } = req.body;

        console.log('orderId:', orderId, 'active:', active, 'date:', date);

        // Validate dữ liệu
        if (!orderId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu orderId!',
            });
        }
        if (!active) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu trạng thái active!',
            });
        }
        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Trường date không hợp lệ!',
            });
        }

        const newActive = { active, date };
        const response = await OrderActiveListService.updateOrderActiveList(orderId, newActive);

        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in updateOrderActiveList:', {
            errorMessage: e.message,
            stack: e.stack,
        });
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi hệ thống!',
        });
    }
};





module.exports = { updateOrderActiveList,createOrderActiveList, getDetailOrderActiveList, getAllOrderActiveList}