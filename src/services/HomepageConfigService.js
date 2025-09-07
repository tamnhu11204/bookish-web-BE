const HomePageConfig = require('../models/HomepageConfigModel');

const getConfig = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let config = await HomePageConfig.findOne({ singleton: 'config' })
                .populate('featuredAuthorId', 'name img info slug');

            if (!config) {
                config = await HomePageConfig.create({ singleton: 'config' });
            }

            resolve({
                status: 'OK',
                message: 'Lấy cấu hình trang chủ thành công',
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
            const updatedConfig = await HomePageConfig.findOneAndUpdate(
                { singleton: 'config' },
                data,
                { new: true, upsert: true }
            );

            resolve({
                status: 'OK',
                message: 'Cập nhật cấu hình trang chủ thành công',
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