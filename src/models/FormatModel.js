//lưu hình thức sách : bìa cứng, bìa mềm,...
const mongoose = require('mongoose')

const formatSchema = new mongoose.Schema(
    {
        code: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Format = mongoose.model('Format', formatSchema);
module.exports = Format;