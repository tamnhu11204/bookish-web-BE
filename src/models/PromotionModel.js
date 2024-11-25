//lưu khuyến mãi
const mongooes = require('mongooes')

const promotionSchema = new mongooes.Schema(
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

const Promotion = mongooes.model('Promotion', promotionSchema);
module.exports = Promotion;
