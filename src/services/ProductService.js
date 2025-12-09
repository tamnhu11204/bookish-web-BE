const Product = require('../models/ProductModel');

// Tạo sản phẩm
const createProduct = async (newProduct) => {
    try {
        const { code,
            name, author, publishYear, weight, dimensions, page, description, price,
            discount, stock, img, star, favorite, view, publisher, language, format, category, supplier, isDeleted,
            deletedAt
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

const getAllProduct = async (limit = 20, page = 1, sort, filters) => {
    try {
        const query = { isDeleted: { $ne: true } }; // Chỉ lấy sản phẩm chưa xóa

        // Xử lý filters
        if (filters) {
            const parsedFilters = typeof filters === 'string' ? JSON.parse(filters) : filters;

            // Categories (array of IDs)
            if (parsedFilters.categories?.length) {
                query.category = { $in: parsedFilters.categories };
            }

            // Publishers
            if (parsedFilters.publishers?.length) {
                query.publisher = { $in: parsedFilters.publishers };
            }

            // Authors
            if (parsedFilters.authors?.length) {
                query.author = { $in: parsedFilters.authors };
            }

            // Languages
            if (parsedFilters.languages?.length) {
                query.language = { $in: parsedFilters.languages };
            }

            // Formats
            if (parsedFilters.formats?.length) {
                query.format = { $in: parsedFilters.formats };
            }

            // Price ranges (array of [min, max])
            if (parsedFilters.priceRanges?.length) {
                const priceConditions = parsedFilters.priceRanges.map(range => {
                    const [minStr, maxStr] = range.split('-');
                    const min = Number(minStr);
                    const max = maxStr === 'Infinity' ? null : Number(maxStr);

                    const condition = {
                        $expr: {
                            $let: {
                                vars: {
                                    discountedPrice: {
                                        $cond: {
                                            if: { $gt: [{ $ifNull: ['$discount', 0] }, 0] },
                                            then: { $multiply: ['$price', { $subtract: [1, { $divide: [{ $ifNull: ['$discount', 0] }, 100] }] }] },
                                            else: '$price'
                                        }
                                    }
                                },
                                in: {
                                    $and: [
                                        { $gte: ['$$discountedPrice', min] },
                                        // Nếu max là null (Infinity), chỉ kiểm tra min
                                        max !== null ? { $lte: ['$$discountedPrice', max] } : true
                                    ]
                                }
                            }
                        }
                    };

                    return condition;
                });

                query.$or = priceConditions;
            }

            // Search term
            if (parsedFilters.search) {
                query.name = { $regex: parsedFilters.search, $options: 'i' };
            }
        }

        // Xử lý sort
        let sortOption = {};
        if (sort) {
            const [field, order] = typeof sort === 'string' ? JSON.parse(sort) : sort;
            if (['price', 'name', 'sold', 'createdAt'].includes(field)) {
                sortOption[field] = order === 'asc' ? 1 : -1;
            }
        }

        // Pagination
        let parsedLimit;
        if (Number(limit) === 0) {
            parsedLimit = 0; // lấy hết
        } else {
            parsedLimit = Number(limit) > 0 ? Number(limit) : 10;
        }

        const parsedPage = Number(page) >= 1 ? Number(page) - 1 : 0;

        // Build query exec
        let queryExec = Product.find(query)
            .sort(sortOption)
            .select('name price discount img category author publisher language format sold createdAt stock')
            .lean();

        // Nếu limit > 0 thì dùng phân trang
        if (parsedLimit > 0) {
            const skip = parsedPage * parsedLimit;
            queryExec = queryExec.skip(skip).limit(parsedLimit);
        }

        // Query và count song song
        const [products, totalProduct] = await Promise.all([
            queryExec,
            Product.countDocuments(query)
        ]);

        return {
            status: 'OK',
            message: 'Products retrieved successfully',
            data: products,
            total: totalProduct,
            pageCurrent: parsedPage + 1,
            totalPage: parsedLimit > 0 ? Math.ceil(totalProduct / parsedLimit) : 1
        };

    } catch (e) {
        console.error('SERVICE ERROR - getAllProduct:', e);
        throw new Error(e.message);
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

const deleteRating = async (productId, rating) => {
    if (rating < 1 || rating > 5) {
        throw new Error('Số sao mới phải nằm trong khoảng từ 1 đến 5.');
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    const { star, feedbackCount } = product;
    product.feedbackCount = feedbackCount - 1
    const totalStars = star * product.feedbackCount;
    const updatedTotalStars = totalStars - rating;
    product.star = updatedTotalStars / product.feedbackCount;

    await product.save();

    return product;
};

const updateView = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    product.view = product.view + 1
    await product.save();

    return product;
};

// Cập nhật số lượng tồn kho của sản phẩm
const updateProductStock = async (id, quantityChange) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }

        // Cập nhật stock mới
        product.stock += quantityChange;

        // Đảm bảo stock không âm
        if (product.stock < 0) {
            return {
                status: 'FAIL',
                message: 'Stock cannot be negative',
            };
        }

        const updatedProduct = await product.save();
        return {
            status: 'OK',
            message: 'Product stock updated successfully',
            data: updatedProduct,
        };
    } catch (e) {
        console.error('Error updating product stock:', e);
        throw { status: 'ERROR', message: 'Error updating product stock', error: e.message };
    }
};

// Xóa mềm sản phẩm
const softDeleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                status: 'FAIL',
                message: 'Product not found',
            };
        }

        if (product.isDeleted) {
            return {
                status: 'FAIL',
                message: 'Product already soft deleted',
            };
        }

        product.isDeleted = true;
        product.deletedAt = new Date();
        await product.save();

        return {
            status: 'OK',
            message: 'Product soft deleted successfully',
            data: product,
        };
    } catch (e) {
        console.error('Error soft deleting product:', e);
        throw { status: 'ERROR', message: 'Error soft deleting product', error: e.message };
    }
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
    updateView,
    updateProductStock,
    softDeleteProduct,
};
