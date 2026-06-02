const { fetchFromEdamam } = require('../services/edamamService');
const { ingredientSearchUrl, edamamAccountUser } = require('../config');

// Fetch ingredients from the Edamam API and return to the client
async function getSingleRecipe(req, res) {
    try {
        const data = await fetchFromEdamam(ingredientSearchUrl, edamamAccountUser);
        data.note = 'We won\'t be using this endpoint in the future. I\'m still working on /missing-ingredients. -- Max';
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    }
}

module.exports = { getIngredients: getSingleRecipe };
