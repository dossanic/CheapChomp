// src/views/RecipeBrowser.jsx
import React, { useState, useEffect } from 'react';
const { fetchRecipesWithBudgets } = require('../services/apiService');

function RecipeBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      executeSearch(searchQuery.trim());
    }
  };

  const executeSearch = async (query) => {
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const data = await fetchRecipesWithBudgets([query]);
      
      const alphabetized = (data || []).sort((a, b) => {
        const titleA = (a.title || '').toLowerCase();
        const titleB = (b.title || '').toLowerCase();
        return titleA.localeCompare(titleB);
      });

      setRecipes(alphabetized);
    } catch (err) {
      console.error("Recipe Browser Fetch Error:", err);
      setError("Failed to fetch recipes from Edamam.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAll = () => {
    setSearchQuery('');
    executeSearch('recipes');
  };

  const styles = {
    container: { padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh' },
    // 👇 Centers everything cleanly up to a comfortable 1200px max layout width
    contentWrapper: { maxWidth: '1200px', margin: '0 auto', width: '100%' },
    heading: { color: '#333', borderBottom: '2px solid #fff3ee', paddingBottom: '10px', marginBottom: '20px' },
    actionsRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center' },
    searchForm: { display: 'flex', gap: '10px', flexGrow: 1, maxWidth: '500px' },
    input: {
      padding: '12px',
      fontSize: '1em',
      borderRadius: '6px',
      border: '1px solid #ffbb9e',
      outline: 'none',
      width: '100%'
    },
    button: {
      padding: '12px 24px',
      background: '#ff6b35',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '1em',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 6px rgba(255, 107, 53, 0.1)'
    },
    getAllButton: {
      padding: '12px 24px',
      background: '#fff3ee',
      color: '#ff6b35',
      border: '2px solid #ff6b35',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '1em',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },
    loadingText: { color: '#ff6b35', fontWeight: 'bold', fontSize: '1.1em' },
    errorText: { color: '#d9381e', fontWeight: 'bold' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
    card: {
      border: '1px solid #fff3ee',
      borderRadius: '12px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column'
    },
    image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' },
    title: { margin: '14px 0 6px 0', fontSize: '1.25em', color: '#333' },
    source: { margin: '0 0 16px 0', color: '#777', fontSize: '0.9em' },
    link: {
      display: 'block',
      textAlign: 'center',
      marginTop: 'auto',
      padding: '10px',
      background: '#ff6b35',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '0.95em'
    }
  };

  return (
    <section style={styles.container}>
      {/* 👇 Added centering layout node */}
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading}>Explore Recipes</h2>

        <div style={styles.actionsRow}>
          <form onSubmit={handleFormSubmit} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for recipes (e.g., lasagna, tacos)..."
              value={searchQuery}
              onChange={handleInputChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Search</button>
          </form>

          <button onClick={handleGetAll} style={styles.getAllButton}>
            Show All (A-Z)
          </button>
        </div>

        {loading && <p style={styles.loadingText}>🍊 Loading recipes...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        {!loading && recipes.length > 0 && (
          <div style={styles.grid}>
            {recipes.map((recipe, index) => (
              <div key={recipe.id || index} style={styles.card}>
                {recipe.image && (
                  <img src={recipe.image} alt={recipe.title} style={styles.image} />
                )}
                <h4 style={styles.title}>{recipe.title || "Untitled Recipe"}</h4>
                <p style={styles.source}>Source: <em>{recipe.source || "Unknown Source"}</em></p>
                <a href={recipe.recipeUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  View Full Recipe Instructions
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecipeBrowser;