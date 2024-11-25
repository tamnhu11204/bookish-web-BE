//lưu ngôn ngữ sách: vie, eng, vie-eng,...
const mongooes = require('mongooes')

const languageSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Language = mongooes.model('Language', languageSchema);
module.exports = Language;