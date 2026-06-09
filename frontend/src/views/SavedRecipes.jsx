import React from 'react';
import { Link } from 'react-router-dom';

function SavedRecipes() {
  return (
    <section>
      <h2>Saved Recipes</h2>

      {/* Placeholder saved recipe. Later this will come from Supabase. */}
      <div>
        <h3>Saved Recipe Name</h3>
        <p>Some ingredients, more ingredients, etc.</p>
        <p>Price Estimate</p>

        <Link to="/recipe-details">View Recipe Details</Link>
      </div>
    </section>
  );
}

export default SavedRecipes;