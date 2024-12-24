const ShopProfile = require('../models/ShopProfileModel');
const bcrypt = require("bcrypt");

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



module.exports = { createShopProfile, updateShopProfile, getAllShopProfile, getDetailShopProfile };