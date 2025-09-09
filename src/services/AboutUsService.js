
const AboutUs = require('../models/AboutUsModel');

const getConfig = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = await AboutUs.findOne({ singleton: 'config' });

            resolve({
                status: 'OK',
                message: 'Lấy cấu hình giới thiệu thành công',
                data: config
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateConfig = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedConfig = await AboutUs.findOneAndUpdate(
                { singleton: 'config' },
                data,
                { new: true, upsert: true }
            );

            resolve({
                status: 'OK',
                message: 'Cập nhật cấu hình giới thiệu thành công',
                data: updatedConfig
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getConfig,
    updateConfig
};