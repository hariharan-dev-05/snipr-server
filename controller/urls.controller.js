const Url = require("../models/url.schema.js");

const getUrls = async (req, res) => {
  // req.user is set by authenticateJWT middleware and should contain .id
  const userId = req.user && req.user.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user id found" });
  }
  try {
    const urls = await Url.find({ user: userId });
    res.status(200).json({ urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUrls,
};
