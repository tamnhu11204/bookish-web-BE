const ActiveService = require('../../services/OptionService/ActiveService');

const createActive = async (req, res) => {
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

        const response = await ActiveService.createActive(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateActive = async (req, res) => {
    try {
        const ActiveID=req.params.id
        const data=req.body
        if (!ActiveID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ActiveID is required'
            });
        }

        const response = await ActiveService.updateActive(ActiveID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteActive = async (req, res) => {
    try {
        const ActiveID=req.params.id
        if (!ActiveID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ActiveID is required'
            });
        }

        const response = await ActiveService.deleteActive(ActiveID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllActive = async (req, res) => {
    try {
        const response = await ActiveService.getAllActive();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailActive = async (req, res) => {
    try {
        const ActiveID=req.params.id
        if (!ActiveID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ActiveID is required'
            });
        }
        const response = await ActiveService.getDetailActive(ActiveID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createActive, updateActive, deleteActive, getAllActive, getDetailActive};
