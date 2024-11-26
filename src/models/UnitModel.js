//lưu đơn vị sách: cuốn, quyển,..
const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;
