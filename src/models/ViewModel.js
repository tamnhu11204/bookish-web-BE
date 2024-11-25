//lưu danh sách sp đã xem
const mongooes = require('mongooes')

const viewSchema = new mongooes.Schema(
    {
        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        product: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const View = mongooes.model('View', viewSchema);
module.exports = View;