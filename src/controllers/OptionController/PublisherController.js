const Publisher = require('../../models/PublisherModel');
const PublisherService = require('../../services/OptionService/PublisherService');


const createPublisher = async (req, res) => {
    try {
        const { name, note } = req.body;

        if (!name) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu tên nhà xuất bản!' });
        }

        if (!req.file) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ảnh nhà xuất bản!' });
        }

        const lastPublisher = await Publisher.findOne().sort({ code: -1 }).select('code');
        let newCode = 'P0001'; 

        if (lastPublisher && lastPublisher.code) {
            const lastNumber = parseInt(lastPublisher.code.slice(1)); 
            newCode = `P${String(lastNumber + 1).padStart(4, '0')}`; 
        }

        const img = req.file.path;
        const newPublisher = { code: newCode, name, note, img };

        //console.log("Dữ liệu trước khi lưu:", newPublisher); 

        const response = await PublisherService.createPublisher(newPublisher);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Lỗi khi tạo danh mục:", e); 
        return res.status(500).json({ message: e.message });
    }
};




const updatePublisher = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, note } = req.body;
        let updatedImg = req.body.img; 

        if (req.file) {
            updatedImg = req.file.path; 
        }

        const updatedPublisher = await Publisher.findByIdAndUpdate(
            req.params.id,
            { name, note, img: updatedImg },
            { new: true }
        );

        if (!updatedPublisher) {
            return res.status(404).json({ message: "Không tìm thấy nhà xuất bản!" });
        }

        console.log("Updated Publisher:", updatedPublisher);
        return res.status(200).json(updatedPublisher);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error.message });
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
