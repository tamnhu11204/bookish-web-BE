const FavoriteProductService = require('../services/FavoriteProductService');

const createFavoriteProduct = async (req, res) => {
    try {
        const {product,user} = req.body;
    

        // Kiểm tra trường nào bị thiếu
        if (!user||!product) {
            resolve({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin!'
            })
        }

        const response = await FavoriteProductService.createFavoriteProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateFavoriteProduct = async (req, res) => {
    try {
        const FavoriteProductID=req.params.id
        const data=req.body
        if (!FavoriteProductID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FavoriteProductID is required'
            });
        }

        const response = await FavoriteProductService.updateFavoriteProduct(FavoriteProductID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteFavoriteProduct = async (req, res) => {
    try {
        const FavoriteProductID=req.params.id
        if (!FavoriteProductID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FavoriteProductID is required'
            });
        }

        const response = await FavoriteProductService.deleteFavoriteProduct(FavoriteProductID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllFavoriteProduct = async (req, res) => {
    try {
        // Lấy query từ request
        const { user, product } = req.query;

        // Gọi service với filter từ query
        const response = await FavoriteProductService.getAllFavoriteProduct({ user, product });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message,
        });
    }
};


const getDetailFavoriteProduct = async (req, res) => {
    try {
        const FavoriteProductID=req.params.id
        if (!FavoriteProductID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The FavoriteProductID is required'
            });
        }
        const response = await FavoriteProductService.getDetailFavoriteProduct(FavoriteProductID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createFavoriteProduct, updateFavoriteProduct, deleteFavoriteProduct, getAllFavoriteProduct, getDetailFavoriteProduct};
