//lưu danh sách sp yêu thích
const mongoose = require('mongoose')

const favoriteProductSchema = new mongoose.Schema(
    {
        //khóa ngoại
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            require: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const FavoriteProduct = mongoose.model('FavoriteProduct', favoriteProductSchema);
module.exports = FavoriteProduct;