//lưu sách
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        author: {type: String, required: true},
        publishDate: {type: Date},
        weight: {type: Number},
        height: {type: Number},
        wIdth: {type: Number},
        length: {type: Number},
        page: {type: Number},
        description: {type: String},
        price: {type: Number, required: true},
        priceEntry: {type: Number, required: true},
        discount: {type: Number, required: true},
        stock: {type: Number, required: true},
        img: {type: String},
        star: {type: Number, required: true},
        favorite: {type: Number, required: true},
        score: {type: Number, required: true},
        hot: {type: Boolean, required: true},
        view: {type: Number, required: true},

        //khoa ngoai
        publisher: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Publisher',
            require: true
        },
        language: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Language',
        },
        format: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Format',
        },
        series: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Series',
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Unit',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;