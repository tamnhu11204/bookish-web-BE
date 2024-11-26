//lưu phương thức thanh toán
const mongoose = require('mongoose')

const paymentMethodSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
module.exports = PaymentMethod;
