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

// Delete a URL by short code (only if it belongs to the user)
const deleteUrl = async (req, res) => {
  const userId = req.user && req.user.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user id found" });
  }
  try {
    const id = req.params.id;
    const url = await Url.findOne({ _id: id });
    if (!url) {
      return res
        .status(404)
        .json({ error: "URL not found or not owned by user" });
    }
    await url.deleteOne();
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUrls,
  deleteUrl,
};
