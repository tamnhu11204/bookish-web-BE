//lưu ncc
const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        img: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true,
    }
);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
