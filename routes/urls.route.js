const express = require("express");
const { getUrls, deleteUrl } = require("../controller/urls.controller.js");
const { authenticateJWT } = require("../controller/auth.controller.js");
const router = express.Router();

router.get("/urls", authenticateJWT, getUrls);
router.delete("/urls/:id", authenticateJWT, deleteUrl);

module.exports = router;
