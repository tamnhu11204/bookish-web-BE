//lưu danh sách sp đã xem
const mongoose = require('mongoose')

const viewSchema = new mongoose.Schema(
    {
        //khóa ngoại
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            require: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const View = mongoose.model('View', viewSchema);
module.exports = View;