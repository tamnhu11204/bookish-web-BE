// lưu các sách bán chạy trong tháng
const mongooes = require('mongooes')

const monthlyBestSellerSchema = new mongooes.Schema(
    {
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        quantity: {type: Number, required: true},

        //khóa ngoại
        product: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const MonthlyBestSeller = mongooes.model('MonthlyBestSeller', monthlyBestSellerSchema);
module.exports = MonthlyBestSeller;

