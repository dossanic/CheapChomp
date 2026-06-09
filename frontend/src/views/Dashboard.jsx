import React, { useState } from 'react';

function Dashboard() {
    const [ingredient, setIngredient] = useState('');
    const [pantryItems, setPantryItems] = useState([
        'Chicken',
        'Rice',
        'Broccoli',
        'Peas'
    ]);

    function addIngredient() {
        if (ingredient.trim() === '') {
            return;
        }

        setPantryItems([...pantryItems, ingredient]);
        setIngredient('');
    }

    return (
        <section>
            <h2>Find a Recipe</h2>

            <p>
                Enter an ingredient you have in your kitchen to add it to your pantry below.
            </p>

            <input
                type="text"
                placeholder="Enter ingredients..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
            />

            <button onClick={addIngredient}>Add</button>

            <section>
                <h2>Pantry Items</h2>

                <ul>
                    {pantryItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>
        </section>
    );
}

export default Dashboard;