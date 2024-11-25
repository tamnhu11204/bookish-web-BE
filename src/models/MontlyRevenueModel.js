// lưu các sách bán chạy trong tháng
const mongooes = require('mongooes')

const monthlyRevenueSchema = new mongooes.Schema(
    {
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        totalMoney: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const MonthlyRevenue = mongooes.model('MonthlyRevenue', monthlyRevenueSchema);
module.exports = MonthlyRevenue;

