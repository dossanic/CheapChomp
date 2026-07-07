// Dependencies
const express = require("express");
const { getSingleRecipe } = require("../controllers/ingredientsController");

// Create router and define routes
const router = express.Router();
router.get("/", getSingleRecipe);

module.exports = router;
