//lưu đơn vị sách: cuốn, quyển,..
const mongooes = require('mongooes')

const unitSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
    },
    {
        timestamps: true,
    }
);

const Unit = mongooes.model('Unit', unitSchema);
module.exports = Unit;
