const express = require('express')
const statRoute = express.Router();
const urlRoutes = express.Router();
const {handleAddUrl, handleGetUrl} = require('../controllers/urls');
const Url = require('../models/urls');


urlRoutes.post('/', handleAddUrl);
urlRoutes.get('/:shortUrl', handleGetUrl);

statRoute.get('/', async (req, res) => {
    docs = await Url.find()
    res.render('home', { docs: docs });
});

statRoute.get('/search', async (req, res) => {
const searchQuery = req.query.search || '';
if (searchQuery !== '') {
    // Optional: Search the DB if you want to filter results (example shown as comment)
    const docs = await Url.findOne({ originalUrl: searchQuery });
        // console.log(docs);
     if(!docs) {
         return res.render('search', { search: "not yet prepared"});}
         // If a document is found, render the search results
        //  console.log(docs);
        return res.render('search', { search: docs.shortUrl});
    }

    // Optional: Search the DB if you want to filter results (example shown as comment)
    // const docs = await Url.find({ originalUrl: { $regex: searchQuery, $options: 'i' } });

    res.render('search', { search: "" });
});

module.exports = {urlRoutes, statRoute};
