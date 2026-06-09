import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Recipes from './views/Recipes';
import SavedRecipes from './views/SavedRecipes';
import About from './views/About';
import Profile from './views/Profile';
import RecipeDetails from './views/RecipeDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipe-details" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;