const HomePageConfigService = require('../services/HomepageConfigService');

const getConfig = async (req, res) => {
    try {
        const response = await HomePageConfigService.getConfig();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const updateConfig = async (req, res) => {
    try {
        const data = req.body;
        const files = req.files;

        if (files) {
            if (files.bannerImage1) data.bannerImage1 = files.bannerImage1[0].path;
            if (files.bannerImage2) data.bannerImage2 = files.bannerImage2[0].path;
        }

        const response = await HomePageConfigService.updateConfig(data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    getConfig,
    updateConfig
};