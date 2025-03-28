//lưu nxb
const mongoose = require('mongoose')

const publisherSchema = new mongoose.Schema(
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

const Publisher = mongoose.model('Publisher', publisherSchema);
module.exports = Publisher;
