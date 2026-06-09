import React from 'react';
import { Link } from 'react-router-dom';

function Recipes() {
  return (
    <section>
      <h2>Recipes</h2>

      {/* Placeholder recipe cards. Later these will come from the Edamam API. */}
      <div>
        <h3>Recipe Name</h3>
        <p>Some ingredients, more ingredients, etc.</p>
        <p>Price Estimate</p>

        {/* Opens single recipe details page */}
        <Link to="/recipe-details">View Recipe Details</Link>
      </div>
    </section>
  );
}

export default Recipes;