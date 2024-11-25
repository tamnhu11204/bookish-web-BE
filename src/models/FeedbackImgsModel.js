//lưu các ảnh của đánh giá
const mongooes = require('mongooes')

const feedbackImgsSchema = new mongooes.Schema(
    {
        img: {type: String, required: true},

        //khoa ngoai
        feedback: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Feedback',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const FeedbackImgs = mongooes.model('FeedbackImgs', feedbackImgsSchema);
module.exports = FeedbackImgs;