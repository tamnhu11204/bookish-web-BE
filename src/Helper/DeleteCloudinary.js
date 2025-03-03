const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cấu hình Cloudinary (nếu chưa có)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Xóa ảnh trên Cloudinary bằng URL ảnh
 * @param {string} imageUrl - Đường dẫn ảnh trên Cloudinary
 * @returns {Promise<void>}
 */
const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Lấy publicId từ URL ảnh
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // Xóa ảnh trên Cloudinary
    await cloudinary.uploader.destroy(publicId);

    console.log(`Đã xóa ảnh trên Cloudinary: ${publicId}`);
  } catch (error) {
    console.error("Lỗi khi xóa ảnh trên Cloudinary:", error);
  }
};

module.exports = { deleteImageFromCloudinary };
