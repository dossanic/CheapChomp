import React from 'react';

function RecipeDetails() {
  return (
    <section>
      <h2>[Recipe Name]</h2>

      {/* Placeholder for recipe image */}
      <div>
        <p>Recipe Picture</p>
      </div>

      <p>
        Recipe Description: This area will show recipe details from the Edamam API.
      </p>

      <h3>Ingredients</h3>
      <ul>
        <li>Ingredient 1 - Price range</li>
        <li>Ingredient 2 - Price range</li>
        <li>Ingredient 3 - Price range</li>
      </ul>

      <h3>Price</h3>
      <p>Total price of missing ingredients</p>

      <h3>Nutrition</h3>
      <ul>
        <li>Nutrition 1</li>
        <li>Nutrition 2</li>
        <li>Nutrition 3</li>
      </ul>
    </section>
  );
}

export default RecipeDetails;