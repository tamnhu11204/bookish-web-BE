//lưu ncc
const mongooes = require('mongooes')

const supplierSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        img: {type: String},
        phone: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        specificAddress: {type: String, required: true},

        //khóa ngoại
        province: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Province',
            require: true
        },
        district: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'District',
            require: true
        },
        commune: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Commune',
            require: true
        }
    },
    {
        timestamps: true,
    }
);

const Supplier = mongooes.model('Supplier', supplierSchema);
module.exports = Supplier;
