//lưu danh mục sản phẩm
const mongooes = require('mongooes')

const categorySchema = new mongooes.Schema(
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

const Category = mongooes.model('Category', categorySchema);
module.exports = Category;
