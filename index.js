const express = require("express");
const authRoutes = require("./routes/auth.route.js");
const sniprRoutes = require("./routes/snipr.route.js");
const urlsRoutes = require("./routes/urls.route.js");
const { redirectUrl } = require("./controller/snipr.controller.js");

require("./db");

const app = express();

app.use(express.json());

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

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = user.generateAuthToken();

    res.status(200).json({ message: "Login successful", token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
