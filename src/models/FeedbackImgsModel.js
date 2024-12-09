//lưu các ảnh của đánh giá
const mongoose = require('mongoose')

const feedbackImgsSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
        feedback: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Feedback',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const FeedbackImgs = mongoose.model('FeedbackImgs', feedbackImgsSchema);
module.exports = FeedbackImgs;