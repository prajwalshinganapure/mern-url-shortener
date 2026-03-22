const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
    if (!req.body || !req.body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        redirectUrl: req.body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    
    return res.render("home", {
        id: shortId,
    })
    
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params. shortId;
    const result = await URL. findOne({ shortId }) ;
    return res.json({
    totalClicks: result.visitHistory. length,
    analytics: result. visitHistory,
});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};