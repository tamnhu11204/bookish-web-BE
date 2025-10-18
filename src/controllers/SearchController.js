const SearchService = require('../services/SearchService');

const searchBooks = async (req, res) => {
    try {
        const { query } = req.body;

        console.log('Search query:', query);

        if (!query || query.trim() === '') {
            return res.status(200).json({
                status: 'ERR',
                message: 'Search query is required'
            });
        }

        const response = await SearchService.searchBooks(query);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in SearchController:', e.message);
        return res.status(404).json({
            message: e.message
        });
    }
};

module.exports = { searchBooks };
