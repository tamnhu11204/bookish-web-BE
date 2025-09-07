const mongoose = require('mongoose');

const homePageConfigSchema = new mongoose.Schema({
    singleton: { type: String, default: 'config', unique: true },

    bannerImage1: { type: String },
    bannerImage2: { type: String },
    bannerTextLine1: { type: String, default: 'Bookish' },
    bannerTextLine2: { type: String, default: 'Mở sách - Mở thế giới' },

    featuredAuthorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },

    aboutSectionTitle: { type: String, default: 'Về Bookish' },
    aboutSectionParagraph: { type: String, default: 'Điểm đến lý tưởng cho những người yêu sách...' },

    feature1Title: { type: String, default: 'Đa dạng đầu sách' },
    feature1Text: { type: String, default: 'Cung cấp nhiều thể loại sách phong phú...' },

    feature2Title: { type: String, default: 'Không gian thân thiện' },
    feature2Text: { type: String, default: 'Không gian đọc sách yên tĩnh, ấm cúng...' },

    feature3Title: { type: String, default: 'Khuyến mãi hấp dẫn' },
    feature3Text: { type: String, default: 'Thường xuyên có ưu đãi, giảm giá...' },

    feature4Title: { type: String, default: 'DVKH tận tâm' },
    feature4Text: { type: String, default: 'Tư vấn nhiệt tình, giúp bạn chọn được sách...' },

}, {
    timestamps: true,
});

const HomePageConfig = mongoose.model('HomePageConfig', homePageConfigSchema);
module.exports = HomePageConfig;