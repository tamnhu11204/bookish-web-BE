//lưu các ảnh của sách
const mongooes = require('mongooes')

const productImgsSchema = new mongooes.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
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

const ProductImgs = mongooes.model('ProductImgs', productImgsSchema);
module.exports = ProductImgs;