//lưu đơn vị sách: cuốn, quyển,..
const mongoose = require('mongoose')

const staticPageSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        content: {type: String, default:''},
    },
    {
        timestamps: true,
    }
);

const StaticPage = mongoose.model('StaticPage', staticPageSchema);
module.exports = StaticPage;
