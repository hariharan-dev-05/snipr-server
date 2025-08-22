const express = require("express");
const { getUrls } = require("../controller/urls.controller.js");
const { authenticateJWT } = require("../controller/auth.controller.js");
const router = express.Router();

router.get("/urls", authenticateJWT, getUrls);

module.exports = router;
