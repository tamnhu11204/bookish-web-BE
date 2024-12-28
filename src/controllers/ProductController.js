const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const {
            name, author, publishDate, weight, height, width, length, page, description, price, priceEntry,
            discount, stock, img, star, favorite, score, hot, view, publisher, language, format, unit, category,
        } = req.body;
        console.log('req.body', req.body);

        if (!name || !author || !price || !priceEntry || discount == null || stock == null) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Missing required fields',
            });
        }

        const response = await ProductService.createProduct(req.body);
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
        const productID = req.params.id;
        if (!productID) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID is required',
            });
        }

        const response = await ProductService.updateProduct(productID, req.body);
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
        const response = await ProductService.getAllProduct(
            Number(limit) || 8,
            Number(page) || 0,
            sort ? JSON.parse(sort) : null,
            filter ? JSON.parse(filter) : null
        );

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error fetching products',
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

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
};
