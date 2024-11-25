//lưu các loại trạng thái của đơn hàng
const mongooes = require('mongooes')

const activeSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Active = mongooes.model('Active', activeSchema);
module.exports = Active;
