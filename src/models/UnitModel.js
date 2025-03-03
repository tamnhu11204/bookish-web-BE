//lưu đơn vị sách: cuốn, quyển,..
const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema(
    {
        code: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;
