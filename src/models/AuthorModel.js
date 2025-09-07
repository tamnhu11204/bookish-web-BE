const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        code: { type: String, unique: true, required: true },
        name: { type: String, required: true, unique: true },
        info: { type: String },
        img: { type: String },
    },
    {
        timestamps: true,
    }
);

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;