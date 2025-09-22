const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  title: { type: String, default: "" }, // Tiêu đề của đoạn, tùy chọn
  content: { type: String, required: true }, // Nội dung đoạn, bắt buộc
});

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Tiêu đề bài viết
    segments: [segmentSchema], // Mảng các đoạn
    image: { type: String }, // Ảnh minh họa (URL)
    author: { type: String, default: "Admin" }, // Người đăng
    category: { type: String }, // Thể loại
    tags: [{ type: String }], // Từ khóa tìm kiếm
    source: { type: String }, // Nguồn bài viết
    publishedAt: { type: Date, default: Date.now }, // Ngày đăng
    status: { type: String, enum: ["draft", "published"], default: "draft" }, // Trạng thái
  },
  {
    timestamps: true, // Tự động tạo createdAt, updatedAt
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;