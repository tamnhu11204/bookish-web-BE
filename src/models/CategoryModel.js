//lưu danh mục sản phẩm
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        img: {type: String},
        slug: {type: String, required: true, unique: true}
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
