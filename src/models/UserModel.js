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
        active: {type: Boolean, required: true},
        isAdmin: {type: Boolean, required: true},

        //khóa ngoại
        gender: {
            type: mongoose.Schema.Types.Objectid, 
            ref: 'Gender',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;