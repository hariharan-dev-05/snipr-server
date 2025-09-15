const express = require("express");
const {
  registerUser,
  loginUser,
  authenticateJWT,
} = require("../controller/auth.controller.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/is-verified", authenticateJWT, (req, res) => {
  res.status(200).json({ verified: true, name: req.user.name });
});

module.exports = router;
