//lưu ncc
const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        img: {type: String},
        phone: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        specificAddress: {type: String, required: true},

        //khóa ngoại
        province: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Province',
            require: true
        },
        district: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'District',
            require: true
        },
        commune: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Commune',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
