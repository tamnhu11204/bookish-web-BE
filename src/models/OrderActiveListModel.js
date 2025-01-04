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
        active: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Active',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const OrderActiveList = mongoose.model('OrderActiveList', orderActiveListSchema);
module.exports = OrderActiveList;