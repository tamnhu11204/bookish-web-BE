//lưu người dùng
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: true},
        img: {type: String},
        birthday: {type: Date, required: true},
        active: {type: Boolean, default: true},
        isAdmin: {type: Boolean, default: false},
        gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;