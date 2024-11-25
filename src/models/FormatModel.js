//lưu hình thức sách : bìa cứng, bìa mềm,...
const mongooes = require('mongooes')

const formatSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Format = mongooes.model('Format', formatSchema);
module.exports = Format;