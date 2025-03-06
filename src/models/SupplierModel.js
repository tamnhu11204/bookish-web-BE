//lưu ncc
const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema(
    {
        code: {type: String, required: true, unique: true},
        name: {type: String, required: true, unique: true},
        note: {type: String},
        img:{type: String}
    },
    {
        timestamps: true,
    }
);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
