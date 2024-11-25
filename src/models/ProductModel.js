//lưu sách
const mongooes = require('mongooes')

const productSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true, unique: true},
        author: {type: String, required: true},
        publishDate: {type: Date},
        weight: {type: Number},
        height: {type: Number},
        width: {type: Number},
        length: {type: Number},
        page: {type: Number},
        description: {type: String},
        price: {type: Number, required: true},
        priceEntry: {type: Number, required: true},
        sale: {type: Number},
        stock: {type: Number, required: true},
        img: {type: String},
        star: {type: Number, required: true},
        favorite: {type: Number, required: true},
        score: {type: Number, required: true},
        hot: {type: Boolean, required: true},
        view: {type: Number, required: true},

        //khoa ngoai
        publisher: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Publisher',
            require: true
        },
        language: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Language',
        },
        format: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Format',
        },
        series: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Series',
        },
        unit: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Unit',
        },
        category: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Category',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongooes.model('Product', productSchema);
module.exports = Product;