//lưu phương thức thanh toán
const mongooes = require('mongooes')

const paymentMethodSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const PaymentMethod = mongooes.model('PaymentMethod', paymentMethodSchema);
module.exports = PaymentMethod;
