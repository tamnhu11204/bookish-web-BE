const ShopProfile = require('../models/ShopProfileModel');
const bcryptjs = require("bcryptjs");

const createShopProfile = (newShopProfile) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, slogan, description, phone, logo, province, district, commune,
            img1, img2, img3, img4, img5, specificAddress, facebook, insta, policy, instruction } = newShopProfile;
        try {
            const createdShopProfile = await ShopProfile.create({
                name, email, slogan, description, phone, logo, province, district, commune,
                img1, img2, img3, img4, img5, specificAddress, facebook, insta, policy, instruction
            });
            if (createdShopProfile) {
                resolve({
                    status: 'OK',
                    message: 'ShopProfile created successfully',
                    data: createdShopProfile
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateShopProfile = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkShopProfile = await ShopProfile.findOne({ _id: id })
            if (checkShopProfile === null) {
                resolve({
                    status: 'OK',
                    message: 'The ShopProfile is not defined'
                })
            }

            const updatedShopProfile = await ShopProfile.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedShopProfile
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getAllShopProfile = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allShopProfile = await ShopProfile.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allShopProfile,
            })
        } catch (e) {
            reject(e);
        }
    });
};



const getDetailShopProfile = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const shopProfile = await ShopProfile.findOne({ _id: id })
            if (shopProfile === null) {
                resolve({
                    status: 'OK',
                    message: 'The ShopProfile is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get detail ShopProfile sucessfully',
                data: shopProfile
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateImage = async (id, img) => {
    try {
        // Tìm cửa hàng dựa trên shopId và cập nhật trường img
        const shop = await ShopProfile.findById(id);

        if (!shop) {
            throw new Error("Cửa hàng không tồn tại.");
        }

        // Cập nhật trường img trong cửa hàng
        shop.img = img;

        // Lưu lại thay đổi
        await shop.save();

        return true;
    } catch (error) {
        console.error("Error in updateImage service: ", error);
        return false;
    }
};

const updatePaymentAndFee = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm kiếm cửa hàng
            const shop = await ShopProfile.findById(id);

            if (!shop) {
                resolve({
                    status: 'ERROR',
                    message: 'Cửa hàng không tồn tại',
                });
            }

            // Cập nhật các trường được yêu cầu
            const updatedShopProfile = await ShopProfile.findByIdAndUpdate(
                id,
                {
                    bank: data.bank,
                    momo: data.momo,
                    deliveryFee: data.deliveryFee
                },
                { new: true } // Trả về document mới sau khi cập nhật
            );

            resolve({
                status: 'OK',
                message: 'Cập nhật thành công',
                data: updatedShopProfile,
            });
        } catch (error) {
            reject(error);
        }
    });
};



module.exports = { updatePaymentAndFee, updateImage, createShopProfile, updateShopProfile, getAllShopProfile, getDetailShopProfile };
