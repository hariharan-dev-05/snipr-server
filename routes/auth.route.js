const express = require("express");
const { registerUser, loginUser, authenticateJWT } = require("../controller/auth.controller.js");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;