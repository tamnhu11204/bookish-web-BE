//lưu đánh giá
const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
    {
        star: {type: Number, require: true},
        content: {type: Number},
        active: {type: Boolean},

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

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
