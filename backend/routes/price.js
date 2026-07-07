const express = require("express");
const { getPriceEstimate } = require("../controllers/priceController");

const router = express.Router();
router.post("/", getPriceEstimate);

module.exports = router;
