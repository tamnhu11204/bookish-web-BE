//lưu khuyến mãi
const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema(
    {
        value: {type: Number, required: true},
        start: {type: Date, required: true},
        finish: {type: Date, required: true},
        condition: {type: Number, required: true},
        quantity: {type: Number, required: true},
        used: {type: Number, default: 0},
    },
    {
        timestamps: true,
    }
);

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;
