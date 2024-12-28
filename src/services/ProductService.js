const Product = require('../models/ProductModel');

// Tạo sản phẩm
const createProduct = async (newProduct) => {
    try {
        const { 
            name, author, publishDate, weight, height, width, length, page, description, price, priceEntry,
            discount, stock, img, star, favorite, score, hot, view, publisher, language, format, unit, category,
         } = newProduct;

        // Kiểm tra sản phẩm đã tồn tại
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return {
                status: 'FAIL',
                message: 'The product name already exists',
            };
        }

        // Tạo sản phẩm mới
        const createdProduct = await Product.create(newProduct);
        return {
            status: 'OK',
            message: 'Product created successfully',
            data: createdProduct,
        };
    } catch (e) {
        console.error('Error creating product:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error creating product', error: e.message };
    }
};

// Cập nhật sản phẩm
const updateProduct = async (id, data) => {
    try {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }
        return {
            status: 'OK',
            message: 'Product updated successfully',
            data: product,
        };
    } catch (e) {
        console.error('Error updating product:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error updating product', error: e.message };
    }
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }
        return {
            status: 'OK',
            message: 'Product deleted successfully',
        };
    } catch (e) {
        console.error('Error deleting product:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error deleting product', error: e.message };
    }
};

// Lấy tất cả sản phẩm với phân trang và sắp xếp
const getAllProduct = async (limit = 10, page = 0, sort = null, filter = null) => {
    try {
        const query = {};
        if (filter) {
            const [field, value] = filter;
            query[field] = { $regex: value, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa/chữ thường
        }

        const sortOption = sort ? { [sort[0]]: sort[1] } : {};

        const totalProduct = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort(sortOption)
            .skip(page * limit)
            .limit(limit);

        return {
            status: 'OK',
            message: 'Products retrieved successfully',
            data: products,
            total: totalProduct,
            pageCurrent: page + 1,
            totalPage: Math.ceil(totalProduct / limit),
        };
    } catch (e) {
        console.error('Error fetching products:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error fetching products', error: e.message };
    }
};

// Lấy chi tiết sản phẩm
const getDetailProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }

        return {
            status: 'OK',
            message: 'Product details retrieved successfully',
            data: product,
        };
    } catch (e) {
        console.error('Error retrieving product details:', e);  // Log lỗi để dễ debug
        throw { status: 'ERROR', message: 'Error retrieving product details', error: e.message };
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
};
