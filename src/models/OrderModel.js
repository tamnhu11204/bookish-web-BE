//lưu đặt hàng
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    require: true
                },
                price: { type: Number, required: true },
                amount: { type: Number, required: true },
                isFeedback: { type: Boolean, default: false },
            }
        ],
        phone: { type: Number, required: true },
        name: { type: String, required: true },
        specificAddress: { type: String, required: true },
        province: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
            require: true
        },
        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
            require: true
        },
        commune: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commune',
            require: true
        },
        paymentMethod: { type: Boolean, default: true, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        discount: { type: Number },
        totalMoney: { type: Number, required: true },
        note: { type: String },
        isCancel: { type: Boolean, default: false },
        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        activeNow:{ type: String },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;