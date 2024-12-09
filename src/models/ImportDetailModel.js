// lưu chi tiết nhập khẩu
const mongoose = require('mongoose')

const importDetailSchema = new mongoose.Schema(
    {
        priceEntry: {type: Number, required: true}, 
        // giá nhập bên sản phẩm nếu giá nhập ở đây khác giá nhập ở bển
        quantity: {type: Number, required: true},
        subTotalMoney: {type: Number, required: true},

        //khoa ngoai
        import: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Import',
            require: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const ImportDetail = mongoose.model('ImportDetail', importDetailSchema);
module.exports = ImportDetail;