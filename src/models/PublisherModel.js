//lưu nxb
const mongoose = require('mongoose')

const publisherSchema = new mongoose.Schema(
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

const Publisher = mongoose.model('Publisher', publisherSchema);
module.exports = Publisher;
