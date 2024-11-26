// lưu các sách bán chạy trong tháng
const mongoose = require('mongoose')

const monthlyBestSellerSchema = new mongoose.Schema(
    {
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        quantity: {type: Number, required: true},

        //khóa ngoại
        product: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const MonthlyBestSeller = mongoose.model('MonthlyBestSeller', monthlyBestSellerSchema);
module.exports = MonthlyBestSeller;

