const Product = require('../models/ProductModel');
const ProductService = require('../services/ProductService');
const mongoose = require('mongoose');

const createProduct = async (req, res) => {
    try {
        const { name, author, publishYear, weight, dimensions, page, description, price,
            discount, stock, star, favorite, view, publisher, language, format, category, supplier, isDeleted,
            deletedAt } = req.body;

        if (!name || !author || !price) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu !' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu ảnh sản phẩm!' });
        }

        const lastProduct = await Product.findOne().sort({ code: -1 }).select('code');
        let newCode = 'PD0001';

        if (lastProduct && lastProduct.code && /^PD\d{4}$/.test(lastProduct.code)) {
            const lastNumber = parseInt(lastProduct.code.slice(2), 10); // slice(2) thay vì slice(1)
            newCode = `PD${String(lastNumber + 1).padStart(4, '0')}`;
        } else {
            newCode = 'PD0001'; // Trường hợp không có sản phẩm nào
        }


        const imgUrls = req.files.map(file => file.path);
        const newProduct = {
            code: newCode, name, author, publishYear, weight, dimensions, page, description, price,
            discount, stock, star, favorite, view, publisher, language, format, category, supplier, isDeleted,
            deletedAt, img: imgUrls
        };


        const response = await ProductService.createProduct(newProduct);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error creating product',
            error: e.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, author, publishYear, weight, dimensions, page, description, price,
            discount, stock, star, favorite, view, publisher, language, format, category, supplier } = req.body;

        let updatedImgs = req.body.existingImages || [];

        if (req.files && req.files.length > 0) {
            updatedImgs = [...updatedImgs, ...req.files.map(file => file.path)];
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name, author, publishYear, weight, dimensions, page, description, price,
                discount, stock, star, favorite, view, publisher, language, format, category, supplier, img: updatedImgs
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        console.log("Updated Product:", updatedProduct);
        return res.status(200).json(updatedProduct);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error updating product',
            error: e.message,
        });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if (!productID) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID is required',
            });
        }

        const response = await ProductService.deleteProduct(productID);
        if (response.message === 'Product not found') {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error deleting product',
            error: e.message,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, filters } = req.query;

        // Validate params
        const parsedLimit = Number(limit) > 0 ? Number(limit) : 20;
        const parsedPage = Number(page) >= 1 ? Number(page) : 1;
        let parsedSort = null;
        let parsedFilters = {};

        if (sort) {
            try {
                parsedSort = JSON.parse(sort); // [field, order]
                if (!Array.isArray(parsedSort) || parsedSort.length !== 2) {
                    throw new Error('Invalid sort format');
                }
            } catch (e) {
                return res.status(400).json({ status: 'ERROR', message: 'Invalid sort format' });
            }
        }

        if (filters) {
            try {
                parsedFilters = JSON.parse(filters);
            } catch (e) {
                return res.status(400).json({ status: 'ERROR', message: 'Invalid filters format' });
            }
        }

        const response = await ProductService.getAllProduct(parsedLimit, parsedPage, parsedSort, parsedFilters);

        return res.status(200).json(response);
    } catch (e) {
        console.error('CONTROLLER ERROR:', e);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error fetching products',
            error: e.message
        });
    }
};


const getDetailProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if (!productID) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID is required',
            });
        }

        const response = await ProductService.getDetailProduct(productID);
        if (!response.data) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Product not found',
            });
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error fetching product details',
            error: e.message,
        });
    }
};

const updateProductRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { star } = req.body;

        if (!id || star === undefined) {
            return res.status(400).json({ message: 'Thiếu thông tin productId hoặc star.' });
        }

        const updatedProduct = await ProductService.updateProductRating(id, parseFloat(star));

        res.status(200).json({
            message: 'Cập nhật số sao thành công.',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProductRating2 = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldRating, newRating } = req.body;

        if (!id || !oldRating || !newRating) {
            return res.status(400).json({ message: 'Thiếu thông tin productId hoặc starRating.' });
        }

        const updatedProduct = await ProductService.updateProductRating2(id, parseFloat(newRating, oldRating));

        res.status(200).json({
            message: 'Cập nhật số sao thành công.',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        if (!id || !rating) {
            return res.status(400).json({ message: 'Thiếu thông tin productId hoặc starRating.' });
        }

        // Gọi service để xử lý logic
        const updatedProduct = await ProductService.deleteRating(id, parseFloat(rating));

        res.status(200).json({
            message: 'Cập nhật số sao thành công.',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateView = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Thiếu thông tin productId hoặc starRating.' });
        }

        // Gọi service để xử lý logic
        const updatedProduct = await ProductService.updateView(id);

        res.status(200).json({
            message: 'Cập nhật số sao thành công.',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật số lượng tồn kho của sản phẩm
const updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantityChange } = req.body;

        if (!id || quantityChange === undefined) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID and quantityChange are required',
            });
        }

        // Gọi service để cập nhật stock
        const response = await ProductService.updateProductStock(id, quantityChange);

        if (response.status === 'OK') {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);  // Nếu có lỗi (ví dụ: stock âm)
        }
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error updating product stock',
            error: e.message,
        });
    }
};

// Soft delete sản phẩm
const softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ID không hợp lệ!',
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 'FAIL',
                message: 'Không tìm thấy sản phẩm!',
            });
        }

        if (product.isDeleted) {
            return res.status(400).json({
                status: 'FAIL',
                message: 'Sản phẩm đã bị xóa mềm trước đó!',
            });
        }

        product.isDeleted = true;
        product.deletedAt = new Date();
        await product.save();

        return res.status(200).json({
            status: 'OK',
            message: 'Xóa mềm sản phẩm thành công!',
            data: product,
        });
    } catch (e) {
        console.error('Error soft deleting product:', e);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Lỗi khi xóa mềm sản phẩm',
            error: e.message,
        });
    }
};


module.exports = {
    updateView,
    deleteRating,
    updateProductRating,
    updateProductRating2,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
    updateProductStock,
    softDeleteProduct
};
