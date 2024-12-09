//lưu giỏ hàng
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        quantity: {type: Number, require: true},

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

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
