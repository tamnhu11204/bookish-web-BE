//lưu nxb
const mongooes = require('mongooes')

const publisherSchema = new mongooes.Schema(
    {
        name: {type: String, required: true, unique: true},
        note: {type: String},
        img: {type: String}
    },
    {
        timestamps: true,
    }
);

const Publisher = mongooes.model('Publisher', publisherSchema);
module.exports = Publisher;
