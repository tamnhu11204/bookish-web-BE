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
            }
        ],
        shippingAddress: {
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
            }
        },
        paymentMethod: {type:Boolean, default: false, required: true},
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        discount: { type: Number },
        totalMoney: { type: Number, required: true },
        note: { type: String, required: true },
        payDate: { type: Date },
        payActive: { type: Boolean, required: true, default: false },
        deliverDate: { type: Date },
        deliverActive: { type: Boolean, required: true, default: false },

        //khoa ngoai
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;