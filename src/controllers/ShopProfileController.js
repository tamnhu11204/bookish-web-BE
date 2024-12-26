const ShopProfileService = require('../services/ShopProfileSerive');

const createShopProfile = async (req, res) => {
    try {
        const { name, email, slogan, description, phone, logo, province, district, commune,
            img1, img2, img3, img4, img5, specificAddress, facebook, insta, policy, instruction } = req.body;

        const response = await ShopProfileService.createShopProfile(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateShopProfile = async (req, res) => {
    try {
        const ShopProfileID = req.params.id
        const data = req.body
        if (!ShopProfileID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ShopProfileID is required'
            });
        }

        const response = await ShopProfileService.updateShopProfile(ShopProfileID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllShopProfile = async (req, res) => {
    try {
        const response = await ShopProfileService.getAllShopProfile();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailShopProfile = async (req, res) => {
    try {
        const ShopProfileID = req.params.id
        if (!ShopProfileID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ShopProfileID is required'
            });
        }
        const response = await ShopProfileService.getDetailShopProfile(ShopProfileID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateImage = async (req, res) => {
    try {
      // Lấy ảnh từ request body (có thể là base64 string)
      const { img } = req.body;
      
      // Kiểm tra xem ảnh có tồn tại không
      if (!img || !Array.isArray(img)) {
        return res.status(400).json({ message: "Ảnh không hợp lệ." });
      }
  
      // Gọi service để cập nhật ảnh
      const result = await shopService.updateImage(req.user.id, img);
  
      if (result) {
        return res.status(200).json({ message: "Cập nhật ảnh thành công." });
      } else {
        return res.status(500).json({ message: "Lỗi khi cập nhật ảnh." });
      }
    } catch (error) {
      console.error('Error in updateShopImage: ', error);
      return res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật ảnh." });
    }
  };


module.exports = { updateImage,createShopProfile, updateShopProfile, getAllShopProfile, getDetailShopProfile };
