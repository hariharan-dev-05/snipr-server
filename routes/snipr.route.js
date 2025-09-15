const express = require("express");
const { authenticateJWT } = require("../controller/auth.controller.js");
const { snipUrl } = require("../controller/snipr.controller.js");
const router = express.Router();

router.post("/snipr", authenticateJWT, snipUrl);

module.exports = router;