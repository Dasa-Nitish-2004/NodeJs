// get model
const Url = require('../models/urls');
const edm = require('short-id')
const express = require('express')
const app = express();
edm.configure({
    length: 8,
    algorithm: 'sha1'
})

async function handleAddUrl(req,res){
    var  originalUrl  = req.body;
    console.log(originalUrl);
    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }
    originalUrl = originalUrl.url;
    
    // Generate a short URL (this is a placeholder, implement your own logic)
    const shortUrl = edm.generate();
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

async function handleGetUrl(req, res) {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }

    url.visitedHistory.push({ ip: req.ip, timestamp: new Date() });
    url.save().catch(err => {
        console.error('Error saving visit history:', err);
    });

    res.redirect(url.originalUrl);
    res.json({ originalUrl: url.originalUrl });
}

module.exports = {
    handleAddUrl,
    handleGetUrl
};