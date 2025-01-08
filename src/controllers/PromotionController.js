const PromotionService = require('../services/PromotionService');

const createPromotion = async (req, res) => {
    try {
        const {value, start, finish, condition, quantity} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (value===null || start===null || finish===null || condition===null || quantity===null ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }

        const response = await PromotionService.createPromotion(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updatePromotion = async (req, res) => {
    try {
        const PromotionID=req.params.id
        const data=req.body
        if (!PromotionID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The PromotionID is required'
            });
        }

        const response = await PromotionService.updatePromotion(PromotionID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deletePromotion = async (req, res) => {
    try {
        const PromotionID=req.params.id
        if (!PromotionID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The PromotionID is required'
            });
        }

        const response = await PromotionService.deletePromotion(PromotionID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllPromotion = async (req, res) => {
    try {
        const response = await PromotionService.getAllPromotion();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailPromotion = async (req, res) => {
    try {
        const PromotionID=req.params.id
        if (!PromotionID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The PromotionID is required'
            });
        }
        const response = await PromotionService.getDetailPromotion(PromotionID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updatePromotionUsage = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await PromotionService.updatePromotionUsage(id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Promotion not found') {
            res.status(404).json({ error: error.message });
        } else if (error.message === 'Promotion already fully used') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};



module.exports = { updatePromotionUsage, createPromotion, updatePromotion, deletePromotion, getAllPromotion, getDetailPromotion};
