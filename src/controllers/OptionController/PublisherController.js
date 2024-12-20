const PublisherService = require('../../services/OptionService/PublisherService');

const createPublisher = async (req, res) => {
    try {
        const {name, note, img} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (!name || name.trim() === ''  ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        const response = await PublisherService.createPublisher(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updatePublisher = async (req, res) => {
    try {
        const PublisherID=req.params.id
        const data=req.body
        const {name, note, img} = req.body;
        console.log('req.body:', req.body);

        if (!name || name.trim() === ""  ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        

        const response = await PublisherService.updatePublisher(PublisherID, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deletePublisher = async (req, res) => {
    try {
        const PublisherID=req.params.id
        if (!PublisherID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The PublisherID is required'
            });
        }

        const response = await PublisherService.deletePublisher(PublisherID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllPublisher = async (req, res) => {
    try {
        const response = await PublisherService.getAllPublisher();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailPublisher = async (req, res) => {
    try {
        const PublisherID=req.params.id
        if (!PublisherID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The PublisherID is required'
            });
        }
        const response = await PublisherService.getDetailPublisher(PublisherID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createPublisher, updatePublisher, deletePublisher, getAllPublisher, getDetailPublisher};
