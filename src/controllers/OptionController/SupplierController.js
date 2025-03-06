const Supplier = require('../../models/SupplierModel');
const SupplierService = require('../../services/OptionService/SupplierService');

const createSupplier = async (req, res) => {
    try {
        const { name, note } = req.body;

        if (!name) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu tên nhà cung cấp!' });
        }

        if (!req.file) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ảnh nhà cung cấp!' });
        }

        const lastSupplier = await Supplier.findOne().sort({ code: -1 }).select('code');
        let newCode = 'S0001'; 

        if (lastSupplier && lastSupplier.code) {
            const lastNumber = parseInt(lastSupplier.code.slice(1)); 
            newCode = `S${String(lastNumber + 1).padStart(4, '0')}`; 
        }

        const img = req.file.path;
        const newSupplier = { code: newCode, name, note, img };

        const response = await SupplierService.createSupplier(newSupplier);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Lỗi khi tạo nhà cung cấp:", e); 
        return res.status(500).json({ message: e.message });
    }
};




const updateSupplier = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { name, note } = req.body;
        let updatedImg = req.body.img; 

        if (req.file) {
            updatedImg = req.file.path; 
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { name, note, img: updatedImg },
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Không tìm thấy nhà cung cấp!" });
        }

        console.log("Updated Supplier:", updatedSupplier);
        return res.status(200).json(updatedSupplier);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const SupplierID=req.params.id
        if (!SupplierID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The SupplierID is required'
            });
        }

        const response = await SupplierService.deleteSupplier(SupplierID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllSupplier = async (req, res) => {
    try {
        const response = await SupplierService.getAllSupplier();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailSupplier = async (req, res) => {
    try {
        const SupplierID=req.params.id
        if (!SupplierID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The SupplierID is required'
            });
        }
        const response = await SupplierService.getDetailSupplier(SupplierID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createSupplier, updateSupplier, deleteSupplier, getAllSupplier, getDetailSupplier};
