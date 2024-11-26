//lưu đặt hàng
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        totalMoney: {type: Number, required: true},
        phone: {type: String, required: true},
        name: {type: String, required: true},
        note: {type: String, required: true},
        payDate: {type: Date},
        payActive: {type: Boolean, required: true},

        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        shippingMethod: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'ShippingMethod',
            require: true
        },
        paymentMethod: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'PaymentMethod',
            require: true
        },
        promotion: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Promotion',
            require: true
        },
        //lưu trạng thái đơn hàng hiện tại
        orderActive: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'OrderActive',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;