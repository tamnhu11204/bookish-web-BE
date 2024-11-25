//lưu nhập hàng
const mongooes = require('mongooes')

const importSchema = new mongooes.Schema(
    {
        date: {type: Date, required: true},
        totalMoney: {type: Number, required: true},
        paymentActive: {type: Boolean, required: true},

        //khoa ngoai
        supplier: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Supplier',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Import = mongooes.model('Import', importSchema);
module.exports = Import;