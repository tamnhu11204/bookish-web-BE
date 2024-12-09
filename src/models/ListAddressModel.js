// lưu các đại chỉ của người dùng
const mongoose = require('mongoose')

const listAddressSchema = new mongoose.Schema(
    {
        specificAddress: {type: String, required: true},

        //khóa ngoại
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            require: true
        },
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

const ListAddress = mongoose.model('ListAddress', listAddressSchema);
module.exports = ListAddress;

