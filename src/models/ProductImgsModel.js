//lưu các ảnh của sách
const mongoose = require('mongoose')

const productImgsSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
        product: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const ProductImgs = mongoose.model('ProductImgs', productImgsSchema);
module.exports = ProductImgs;