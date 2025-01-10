const FeedbackService = require('../services/FeedbackService');

const createFeedback = async (req, res) => {
    try {
        const {product, img, content, star, user} = req.body;
    

        // Kiểm tra trường nào bị thiếu
        if (!star||!user||!product) {
            resolve({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin!'
            })
        }

        const response = await FeedbackService.createFeedback(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateFeedback = async (req, res) => {
    try {
        const FeedbackID=req.params.id
        const data=req.body
        if (!FeedbackID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FeedbackID is required'
            });
        }

        const response = await FeedbackService.updateFeedback(FeedbackID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const FeedbackID=req.params.id
        if (!FeedbackID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FeedbackID is required'
            });
        }

        const response = await FeedbackService.deleteFeedback(FeedbackID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllFeedback = async (req, res) => {
    try {
        // Lấy query từ request
        const { user, product } = req.query;

        // Gọi service với filter từ query
        const response = await FeedbackService.getAllFeedback({ user, product });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message,
        });
    }
};


const getDetailFeedback = async (req, res) => {
    try {
        const FeedbackID=req.params.id
        if (!FeedbackID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FeedbackID is required'
            });
        }
        const response = await FeedbackService.getDetailFeedback(FeedbackID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createFeedback, updateFeedback, deleteFeedback, getAllFeedback, getDetailFeedback};
