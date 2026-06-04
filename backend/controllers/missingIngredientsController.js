const { fetchFromEdamam } = require('../services/edamamService');
const { buildIngredientSearchUrl, edamamAccountUser } = require('../config');

// Fetch ingredients THAT DO NOT CONTAIN QUERY PARAMS from the Edamam API and return to the client
// TODO: Fix rawIngredients not being array (or maybe frontend needs to add recipe ID?)
async function getMissingIngredients(req, res) {
    // Require query parameter and validate
    const query = String(req.query?.q || '').trim().toLowerCase();
    if (!query) {
        return res.status(400).send('Missing query parameter: "?q=[ingredient]" is required');
    }

    try {
        // Build URL and fetch data from Edamam API
        const url = buildIngredientSearchUrl(query);
        const data = await fetchFromEdamam(url, edamamAccountUser);

        // Require ingredients field in response
        const rawIngredients = data.ingredients || data.recipe?.ingredients;
        if (!Array.isArray(rawIngredients)) {
            return res.status(500).send('Invalid response: object is not an array');
        }

        // Filter out ingredients that contain the query term
        const filteredIngredients = rawIngredients.filter(ingredient =>
            !ingredient.food.text.toLowerCase().includes(query)
        );

        // Return data to client
        return res.json({ ...data, ingredients: filteredIngredients });

    } catch (err) {
        console.error(err);
        return res.status(500).send('Error fetching data because reasons');
    }
}

module.exports = { getMissingIngredients };