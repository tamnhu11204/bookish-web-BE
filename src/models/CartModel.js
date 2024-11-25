//lưu giỏ hàng
const mongooes = require('mongooes')

const cartSchema = new mongooes.Schema(
    {
        quantity: {type: Number, require: true},

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

const Cart = mongooes.model('Cart', cartSchema);
module.exports = Cart;
