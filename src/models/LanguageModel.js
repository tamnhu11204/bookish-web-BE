//lưu ngôn ngữ sách: vie, eng, vie-eng,...
const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Language = mongoose.model('Language', languageSchema);
module.exports = Language;