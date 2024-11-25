//lưu đặt hàng
const mongooes = require('mongooes')

const orderSchema = new mongooes.Schema(
    {
        totalMoney: {type: Number, required: true},
        phone: {type: String, required: true},
        name: {type: String, required: true},
        note: {type: String, required: true},
        payDate: {type: Date},
        payActive: {type: Boolean, required: true},

        //khoa ngoai
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        shippingMethod: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'ShippingMethod',
            require: true
        },
        paymentMethod: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'PaymentMethod',
            require: true
        },
        promotion: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Promotion',
            require: true
        },
        //lưu trạng thái đơn hàng hiện tại
        orderActive: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'OrderActive',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongooes.model('Order', orderSchema);
module.exports = Order;