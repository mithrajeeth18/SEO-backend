// routes/seoRoutes.js
const express = require("express");
const router = express.Router();
const seoController = require("../controllers/seoController");

router.get("/analyze", seoController.analyzeSEO);

module.exports = router;
