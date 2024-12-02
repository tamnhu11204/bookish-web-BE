const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const {
            name, author, publishDate, weight, height, width, length, page, description, price, priceEntry,
            discount, stock, img, star, favorite, score, hot, view
        } = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (
            author == null || name == null || price == null || priceEntry == null || discount == null ||
            stock == null || star == null || favorite == null || score == null || view == null || hot == null
        ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }

        // Truyền dữ liệu req.body vào ProductService
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};



module.exports = { createProduct};
