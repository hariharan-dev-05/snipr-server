const Url = require("../models/url.schema.js");
const shortid = require("shortid");

const snipUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ message: "Original URL is required" });
  }
  try {
    // Check for existing short URL for this user and originalUrl
    const host = req.get("host");
    const protocol = req.protocol;
    const basePath = `/`;
    const existing = await Url.findOne({ originalUrl, user: req.user.id });
    if (existing) {
      return res
        .status(200)
        .json({
          message: "URL already shortened",
          fullShortUrl: existing.fullShortUrl,
        });
    }
    const shortId = shortid.generate();
    const fullShortUrl = `${protocol}://${host}${basePath}${shortId}`;
    const newUrl = new Url({ originalUrl, fullShortUrl, user: req.user.id });
    await newUrl.save();
    res
      .status(201)
      .json({ message: "URL shortened successfully", fullShortUrl });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Redirect controller
const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const host = req.get("host");
    const protocol = req.protocol;
    const basePath = `/`;
    const fullShortUrl = `${protocol}://${host}${basePath}${shortUrl}`;
    const urlDoc = await Url.findOne({ fullShortUrl });
    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    urlDoc.clicks += 1;
    await urlDoc.save();
    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { snipUrl, redirectUrl };
