const { fetchFromEdamam } = require('../services/edamamService');
const { ingredientSearchUrl, edamamAccountUser } = require('../config');

// Fetch ingredients THAT DO NOT CONTAIN QUERY PARAMS from the Edamam API and return to the client
// TODO: Fix filter being undefined
// TODO: Change this to accept a query in the URL (e.g., /missing-ingredients?q=chicken)
async function getMissingIngredients(req, res) {
    try {
        // Get data from Edamam API
        const data = await fetchFromEdamam(ingredientSearchUrl, edamamAccountUser);

        // Require and normalize query parameter
        if (!req.query?.q) {
            return res.status(400).send('Missing query parameter');
        }
        const query = String(req.query.q).toLowerCase();

        // Filter out ingredients that contain the query string (case-insensitive)
        data.ingredients = data.ingredients.filter(ingredient => {
            return !ingredient.food.text.toLowerCase().includes(query);
        });

        // Return data to client
        return res.json(data);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching data');
    }
}

module.exports = { getMissingIngredients };