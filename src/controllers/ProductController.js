const Product = require('../models/ProductModel');
const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, author, publishDate, weight, height, width, length, page, description, price,
            discount, stock, star, favorite, view, publisher, language, format, unit, category, supplier } = req.body;

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
            code: newCode, name, author, publishDate, weight, height, width, length, page, description, price,
            discount, stock, star, favorite, view, publisher, language, format, unit, category, supplier, img: imgUrls
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
        const { name, author, publishDate, weight, height, width, length, page, description, price,
            discount, stock, star, favorite, view, publisher, language, format, unit, category, supplier } = req.body;

        let updatedImgs = req.body.existingImages || [];

        if (req.files && req.files.length > 0) {
            updatedImgs = [...updatedImgs, ...req.files.map(file => file.path)];
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name, author, publishDate, weight, height, width, length, page, description, price,
                discount, stock, star, favorite, view, publisher, language, format, unit, category, supplier, img: updatedImgs
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
        const { limit, page, sort, filter } = req.query;

        // Chuyển đổi limit và page, đảm bảo là số hợp lệ
        const parsedLimit = Number(limit) > 0 ? Number(limit) : 0; // Nếu không hợp lệ, dùng 0 để lấy tất cả
        const parsedPage = Number(page) >= 0 ? Number(page) : 0;

        const response = await ProductService.getAllProduct(
            parsedLimit,
            parsedPage,
            sort,
            filter
        );

        return res.status(200).json(response);
    } catch (e) {
        console.error("CONTROLLER ERROR:", e);
        return res.status(500).json({
            status: "ERROR",
            message: "Error fetching products",
            error: e.message,
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
const softDeleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return { status: 'FAIL', message: 'Product not found' };
        }

        if (product.isDeleted) {
            return { status: 'FAIL', message: 'Product already deleted' };
        }

        product.isDeleted = true;
        product.deletedAt = new Date();
        await product.save();

        return { status: 'OK', message: 'Product soft deleted successfully', data: product };
    } catch (e) {
        console.error('Error soft deleting product:', e);
        throw { status: 'ERROR', message: 'Error soft deleting product', error: e.message };
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
