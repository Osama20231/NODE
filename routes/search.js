const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

router.get('/search', async (req, res) => {
    const query = req.query.query || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of results per page

    try {
        // Save search term in session
        if (!req.session.searchHistory) {
            req.session.searchHistory = [];
        }
        req.session.searchHistory.push(query);

        // Find results matching the search query
        const results = await Place.find({
            name: new RegExp(query, 'i') // Case-insensitive search
        })
        .skip((page - 1) * limit)
        .limit(limit);

        const count = await Place.countDocuments({
            name: new RegExp(query, 'i')
        });

        res.render('search-results', {
            query: query,
            results: results,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            searchHistory: req.session.searchHistory
        });
    } catch (error) {
        console.error("Error occurred during search:", error);
        res.render('search-results', { query: query, results: [], searchHistory: req.session.searchHistory });
    }
});

module.exports = router;