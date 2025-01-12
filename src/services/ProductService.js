const Product = require('../models/ProductModel');

// Tạo sản phẩm
const createProduct = async (newProduct) => {
    try {
        const {
            name, author, publishDate, weight, height, width, length, page, description, price,
            discount, stock, img, star, favorite, view, publisher, language, format, unit, category, supplier
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
        console.error('Error creating product:', e); 
        throw { status: 'ERROR', message: 'Error creating product', error: e.message };
    }
};

// Cập nhật sản phẩm
const updateProduct = async (id, data) => {
    try {
        if (data.img && !Array.isArray(data.img)) {
            data.img = [data.img];
        }

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
        console.error('Error updating product:', e);  
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
        console.error('Error deleting product:', e);  
        throw { status: 'ERROR', message: 'Error deleting product', error: e.message };
    }
};

// Lấy tất cả sản phẩm với phân trang và sắp xếp
const getAllProduct = async (limit = 10, page = 0, sort = null, filter = null) => {
    try {
        const query = {};
        if (filter) {
            const [field, value] = filter;
            query[field] = { $regex: value, $options: 'i' }; 
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
        console.error('Error fetching products:', e);  
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

const updateProductRating = async (productId, newRating) => {
    if (newRating < 1 || newRating > 5) {
        throw new Error('Số sao phải nằm trong khoảng từ 1 đến 5.');
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    // Cập nhật tổng số sao và số lượt đánh giá
    product.feedbackCount += 1;
    product.star = (product.star + newRating) / product.feedbackCount; // Ví dụ tính trung bình

    await product.save();

    return product;
};

const updateProductRating2 = async (productId, newRating, oldRating) => {
    if (newRating < 1 || newRating > 5) {
        throw new Error('Số sao mới phải nằm trong khoảng từ 1 đến 5.');
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    if (oldRating < 0 || oldRating > 5) {
        throw new Error('Số sao cũ phải nằm trong khoảng từ 0 đến 5.');
    }

    const { star, feedbackCount } = product;

    const totalStars = star * feedbackCount; 
    const updatedTotalStars = totalStars - oldRating + newRating; 
    product.star = updatedTotalStars / feedbackCount; 

    await product.save();

    return product;
};

const deleteRating = async (productId, rating ) => {
    if (rating < 1 || rating > 5) {
        throw new Error('Số sao mới phải nằm trong khoảng từ 1 đến 5.');
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    const { star, feedbackCount } = product;
    product.feedbackCount=feedbackCount-1
    const totalStars = star * product.feedbackCount;
    const updatedTotalStars = totalStars - rating ; 
    product.star = updatedTotalStars / product.feedbackCount; 

    await product.save();

    return product;
};

const updateView = async (productId ) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    product.view=product.view+1
    await product.save();

    return product;
};

module.exports = {
    updateProductRating,
    deleteRating,
    updateProductRating2,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
    updateView
};
