const ImportService = require('../services/ImportService');

// Tạo một lần nhập hàng mới
const createImport = async (req, res) => {
    try {
        const { importItems, supplier, importDate, totalImportPrice, note, user, status } = req.body;
        if (!importItems || !supplier || !importDate || totalImportPrice === null || !user) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Missing required fields',
            });
        }
        const response = await ImportService.createImport(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error creating import',
            error: e.message,
        });
    }
};

// Lấy tất cả các lần nhập hàng
const getAllImports = async (req, res) => {
    const { user } = req.query; // Lấy user từ query
    try {
        const response = await ImportService.getAllImports(user); // Nếu không có user, truyền undefined
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

// Lấy chi tiết một lần nhập hàng
const getImportById = async (req, res) => {
    try {
        const importId = req.params.id;
        if (!importId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The importId is required'
            });
        }
        const response = await ImportService.getImportById(importId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

// Cập nhật trạng thái của lần nhập hàng
const updateImportStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Status is required'
            });
        }

        const updatedImport = await ImportService.updateImportStatus(id, status);
        return res.status(200).json({
            status: 'OK',
            message: 'Import status updated successfully',
            import: updatedImport.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'Error updating import status',
        });
    }
};

// Xóa một lần nhập hàng
const deleteImport = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedImport = await ImportService.deleteImport(id);
        return res.status(200).json({
            status: 'OK',
            message: 'Import deleted successfully',
            import: deletedImport.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'Error deleting import',
        });
    }
};

// Cập nhật một lần nhập hàng
const updateImport = async (req, res) => {
    const { id } = req.params;
    const { importItems, totalImportPrice } = req.body;

    try {
        // Kiểm tra dữ liệu đầu vào
        if (!importItems || totalImportPrice === null) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Missing required fields: importItems and totalImportPrice are required',
            });
        }

        const response = await ImportService.updateImport(id, req.body);
        return res.status(200).json({
            status: 'OK',
            message: 'Import updated successfully',
            import: response.data,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'Error updating import',
        });
    }
};

module.exports = {
    createImport,
    getAllImports,
    getImportById,
    updateImportStatus,
    deleteImport,
    updateImport
};