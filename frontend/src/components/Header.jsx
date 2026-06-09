import React from 'react';
import { Link } from 'react-router-dom';

// Header component used across all pages
function Header() {
    return (
        <header>

            {/* Website Logo / Title */}
            <div>
                <h1>BudgetBite</h1>
            </div>

            {/* Main Navigation */}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/recipes">Recipes</Link>
                    </li>

                    <li>
                        <Link to="/saved-recipes">Saved Recipes</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>

            {/* Placeholder until authentication is implemented */}
            <div>
                <span>Welcome, User</span>
            </div>

        </header>
    );
}

export default Header;