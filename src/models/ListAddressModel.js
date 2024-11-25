// lưu các đại chỉ của người dùng
const mongooes = require('mongooes')

const listAddressSchema = new mongooes.Schema(
    {
        specificAddress: {type: String, required: true},

        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
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

const ListAddress = mongooes.model('ListAddress', listAddressSchema);
module.exports = ListAddress;

