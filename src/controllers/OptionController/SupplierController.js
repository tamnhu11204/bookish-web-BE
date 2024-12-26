const SupplierService = require('../../services/OptionService/SupplierService');

const createSupplier = async (req, res) => {
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

        const response = await SupplierService.createSupplier(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const SupplierID=req.params.id
        const data=req.body
        const {name, note, img} = req.body;
        console.log('req.body:', req.body);

        if (!name || name.trim() === ""  ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        

        const response = await SupplierService.updateSupplier(SupplierID, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
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
