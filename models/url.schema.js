const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  fullShortUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Url", urlSchema);
