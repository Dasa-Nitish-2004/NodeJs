const express = require('express');
const idm = require('short-id');
const Url = require('../models/url');

const app = express();
idm.configure({
    length: 6,          // The length of the id strings to generate
    algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    salt: Math.random   // A salt value or function
});

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

async function handleShortUrl(req, res) {
    console.log(req.body);
    const  originalUrl  = req.body.url;    

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }
    // Generate a short URL (you can use a library or your own logic)
    const shortUrl = idm.generate();
    // Save the mapping in the database

    const existingUrl = await Url.findOne({originalUrl : originalUrl})
    console.log(existingUrl);
    if (existingUrl) {
        return res.status(200).json({ originalUrl: existingUrl.originalUrl, shortUrl: existingUrl.shortUrl });
    }
    await Url.create({ originalUrl : originalUrl, shortUrl : shortUrl, visitedHistory: [] }).then(() => {
        console.log('URL saved successfully');
    }).catch(err => {
        // console.error('Error saving URL:', err);
        return res.status(500).json({ error: `Internal server error: ${err.message}` });

    });
    res.json({ originalUrl, shortUrl });
}

module.exports = {
    handleShortUrl
};