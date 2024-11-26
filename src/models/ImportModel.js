//lưu nhập hàng
const mongoose = require('mongoose')

const importSchema = new mongoose.Schema(
    {
        date: {type: Date, required: true},
        totalMoney: {type: Number, required: true},
        paymentActive: {type: Boolean, required: true},

        //khoa ngoai
        supplier: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Supplier',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Import = mongoose.model('Import', importSchema);
module.exports = Import;