// lưu chi tiết nhập khẩu
const mongooes = require('mongooes')

const importDetailSchema = new mongooes.Schema(
    {
        priceEntry: {type: Number, required: true}, 
        // giá nhập bên sản phẩm nếu giá nhập ở đây khác giá nhập ở bển
        quantity: {type: Number, required: true},
        subTotalMoney: {type: Number, required: true},

        //khoa ngoai
        import: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Import',
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

const ImportDetail = mongooes.model('ImportDetail', importDetailSchema);
module.exports = ImportDetail;