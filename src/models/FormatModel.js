//lưu hình thức sách : bìa cứng, bìa mềm,...
const mongoose = require('mongoose')

const formatSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Format = mongoose.model('Format', formatSchema);
module.exports = Format;