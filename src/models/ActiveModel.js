//lưu các loại trạng thái của đơn hàng
const mongoose = require('mongoose')

const activeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Active = mongoose.model('Active', activeSchema);
module.exports = Active;
