//lưu khuyến mãi
const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema(
    {
        value: {type: Number, required: true},
        start: {type: Date, required: true},
        finish: {type: Date, required: true},
        quantity: {type: Number, required: true},
        stock: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;
