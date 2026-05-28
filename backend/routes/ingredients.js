// Dependencies
const express = require("express");
const {
  getIngredients,
  getPriceEstimate,
} = require("../controllers/ingredientsController");

// Create router and define routes
const router = express.Router();
router.get("/", getIngredients);
router.post("/price", getPriceEstimate);

module.exports = router;
