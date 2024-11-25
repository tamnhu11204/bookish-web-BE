//lưu các mốc thời gian của đơn hàng
const mongooes = require('mongooes')

const orderActiveListSchema = new mongooes.Schema(
    {
        //khóa ngoại
        active: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Active',
            require: true
        },
        active: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Active',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const OrderActiveList = mongooes.model('OrderActiveList', orderActiveListSchema);
module.exports = OrderActiveList;