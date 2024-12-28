const StatusService = require('../../services/OptionService/StatusService');

const createStatus = async (req, res) => {
    try {
        const {name, note} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (name === null) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        const response = await StatusService.createStatus(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const StatusID=req.params.id
        const data=req.body
        if (!StatusID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The StatusID is required'
            });
        }

        const response = await StatusService.updateStatus(StatusID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteStatus = async (req, res) => {
    try {
        const StatusID=req.params.id
        if (!StatusID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The StatusID is required'
            });
        }

        const response = await StatusService.deleteStatus(StatusID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllStatus = async (req, res) => {
    try {
        const response = await StatusService.getAllStatus();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailStatus = async (req, res) => {
    try {
        const StatusID=req.params.id
        if (!StatusID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The StatusID is required'
            });
        }
        const response = await StatusService.getDetailStatus(StatusID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createStatus, updateStatus, deleteStatus, getAllStatus, getDetailStatus};
