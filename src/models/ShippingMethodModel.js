//lưu phương thức vận chuyển
const mongooes = require('mongooes')

const shippingMethodSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        money: {type: Number, required: true}
    },
    {
        timestamps: true,
    }
);

const ShippingMethod = mongooes.model('ShippingMethod', shippingMethodSchema);
module.exports = ShippingMethod;
