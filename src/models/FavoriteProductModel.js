//lưu danh sách sp yêu thích
const mongooes = require('mongooes')

const favoriteProductSchema = new mongooes.Schema(
    {
        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        product: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const FavoriteProduct = mongooes.model('FavoriteProduct', favoriteProductSchema);
module.exports = FavoriteProduct;