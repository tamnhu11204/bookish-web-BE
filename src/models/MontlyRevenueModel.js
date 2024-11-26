// lưu các sách bán chạy trong tháng
const mongoose = require('mongoose')

const monthlyRevenueSchema = new mongoose.Schema(
    {
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        totalMoney: {type: Number, required: true},
    },
    {
        timestamps: true,
    }
);

const MonthlyRevenue = mongoose.model('MonthlyRevenue', monthlyRevenueSchema);
module.exports = MonthlyRevenue;

