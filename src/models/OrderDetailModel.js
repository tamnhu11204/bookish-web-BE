//lưu chi tiết đơn hàng
const mongooes = require('mongooes')

const orderDetailSchema = new mongooes.Schema(
    {
        price: {type: Number, require: true}, //giá lúc bán
        quantity: {type: Number, require: true},
        subTotalMoney: {type: Number, require: true},

        //khóa ngoại
        order: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Order',
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

const OrderDetail = mongooes.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;
