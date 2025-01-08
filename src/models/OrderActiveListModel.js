//lưu các mốc thời gian của đơn hàng
const mongoose = require('mongoose')

const orderActiveListSchema = new mongoose.Schema(
    {
        //khóa ngoại
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            require: true
        },
        activeList: [{
            active: { type: String, required: true },
            date: { type: Date, required: true },
        }],
    },

    {
        timestamps: true,
    }
);

const OrderActiveList = mongoose.model('OrderActiveList', orderActiveListSchema);
module.exports = OrderActiveList;