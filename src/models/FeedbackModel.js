//lưu đánh giá
const mongooes = require('mongooes')

const feedbackSchema = new mongooes.Schema(
    {
        star: {type: Number, require: true},
        content: {type: Number},
        active: {type: Boolean},

        //khóa ngoại
        user: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'User',
            require: true
        },
        product: {
            type: mongooes.Schema.Types.Objectid, 
            ref: 'Product',
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Feedback = mongooes.model('Feedback', feedbackSchema);
module.exports = Feedback;
