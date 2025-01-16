const StaticPageService = require('../services/StaticPageService');

const createStaticPage = async (req, res) => {
    try {
        const {name, content} = req.body;
        
        console.log('req.body', req.body);

        // Kiểm tra trường nào bị thiếu
        if (!name) {
            resolve({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin!'
            })
        }

        const response = await StaticPageService.createStaticPage(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const updateStaticPage = async (req, res) => {
    try {
        const StaticPageID=req.params.id
        const data=req.body
        if (!StaticPageID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The StaticPageID is required'
            });
        }

        const response = await StaticPageService.updateStaticPage(StaticPageID, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteStaticPage = async (req, res) => {
    try {
        const StaticPageID=req.params.id
        if (!StaticPageID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The StaticPageID is required'
            });
        }

        const response = await StaticPageService.deleteStaticPage(StaticPageID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllStaticPage = async (req, res) => {
    try {
        const response = await StaticPageService.getAllStaticPage();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getDetailStaticPage = async (req, res) => {
    try {
        const StaticPageID=req.params.id
        if (!StaticPageID){
            return res.status(200).json({
                status: 'ERR',
                message: 'The StaticPageID is required'
            });
        }
        const response = await StaticPageService.getDetailStaticPage(StaticPageID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};


module.exports = { createStaticPage, updateStaticPage, deleteStaticPage, getAllStaticPage, getDetailStaticPage};
