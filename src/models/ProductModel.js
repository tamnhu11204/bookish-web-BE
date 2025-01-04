//lưu sách
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // Tên sản phẩm bắt buộc và duy nhất
        author: { type: String, required: true }, // Tác giả bắt buộc
        publishDate: { type: Date }, // Ngày xuất bản không bắt buộc
        weight: { type: Number, default: 0 }, // Trọng lượng, thêm giá trị mặc định
        height: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        length: { type: Number, default: 0 },
        page: { type: Number, default: 0 }, // Số trang
        description: { type: String, default: "" }, // Mô tả
        price: { type: Number, required: true }, // Giá sản phẩm bắt buộc
        discount: { type: Number, default: 0 }, // Phần trăm giảm giá
        stock: { type: Number, default: 0 }, // Tồn kho
        img: { type: [String] },
        star: { type: Number, default: 0 }, // Số sao
        favorite: { type: Number, default: 0 }, // Số yêu thích
        view: { type: Number, default: 0 }, // Lượt xem
        sold: {type: Number, default: 0},
        feedbackCount: {type: Number, default: 0},

        // Định nghĩa các khóa ngoại
        publisher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publisher',
            required: true // Nhà xuất bản bắt buộc
        },
        language: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Language'
        },
        format: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Format'
        },
        series: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Series'
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true // Danh mục sản phẩm bắt buộc
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true 
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
