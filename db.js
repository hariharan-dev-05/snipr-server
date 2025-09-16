require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});
