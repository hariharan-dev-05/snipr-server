const express = require("express");
const authRoutes = require("./routes/auth.route.js");
const sniprRoutes = require("./routes/snipr.route.js");
const urlsRoutes = require("./routes/urls.route.js");
const cors = require("cors");
const { redirectUrl } = require("./controller/snipr.controller.js");

require("./db");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://snipr-client.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Snipr Server!" });
});

app.use("/api/auth", authRoutes);
app.use("/api", sniprRoutes);
app.use("/api", urlsRoutes);
app.get("/:shortUrl", redirectUrl);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
