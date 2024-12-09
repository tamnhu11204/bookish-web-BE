//lưu chi tiết đơn hàng
const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema(
    {
        price: {type: Number, require: true}, //giá lúc bán
        quantity: {type: Number, require: true},
        subTotalMoney: {type: Number, require: true},

        //khóa ngoại
        order: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Order',
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

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;
