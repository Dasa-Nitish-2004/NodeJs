const express = require('express');
const router = express.Router();
const {handleShortUrl} = require('../controller/url');
const Url = require('../models/url');
router.post('/', handleShortUrl);
router.get('/:shortUrl', async (req, res) => {

    const shortUrl = req.params.shortUrl;    
    console.log('URL Entry:', shortUrl);
    const urlEntry = await Url.findOne({ shortUrl: `${shortUrl}` });
    console.log('URL Entry:', urlEntry);
    if (urlEntry) {
        // Increment visit count or log visit
        urlEntry.visitedHistory.push({ ip: req.ip , timestamp: new Date() });
        await urlEntry.save();
        console.log('Visited history updated:', urlEntry.visitedHistory);
        return res.redirect(`${urlEntry.originalUrl}`);
    }
    res.status(404).json({ error: 'URL not found' });
});
module.exports = router;