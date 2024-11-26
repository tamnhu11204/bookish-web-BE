//lưu phương thức vận chuyển
const mongoose = require('mongoose')

const shippingMethodSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        money: {type: Number, required: true}
    },
    {
        timestamps: true,
    }
);

const ShippingMethod = mongoose.model('ShippingMethod', shippingMethodSchema);
module.exports = ShippingMethod;
