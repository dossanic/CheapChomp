// src/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for switching to signup
const { supabase } = require('../services/supabaseClient');

function Login() {
  const navigate = useNavigate();

  // Stores what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uiError, setUiError] = useState(null); // Replaces ugly window alert pop-ups

  // Handles login when the form is submitted
  async function handleLogin(e) {
    e.preventDefault();
    setUiError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      setUiError(error.message);
    } else {
      // Save the logged-in user session string
      localStorage.setItem('user', JSON.stringify(data.user));
      // Send user back to protected Dashboard area
      navigate('/');
    }
  }

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#fdfdfd',
      padding: '20px'
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#fff',
      padding: '40px 30px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      border: '1px solid #fff3ee'
    },
    title: {
      color: '#ff6b35',
      margin: '0 0 8px 0',
      fontSize: '2.2em',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    subtitle: {
      color: '#666',
      textAlign: 'center',
      margin: '0 0 30px 0',
      fontSize: '0.95em'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: '#444',
      fontWeight: '600',
      marginBottom: '8px',
      fontSize: '0.9em'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '1em',
      borderRadius: '6px',
      border: '1px solid #ffbb9e',
      outline: 'none',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa',
      transition: 'border 0.2s'
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      background: '#ff6b35',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '1.05em',
      cursor: 'pointer',
      marginTop: '10px',
      boxShadow: '0 4px 10px rgba(255, 107, 53, 0.2)'
    },
    errorBox: {
      backgroundColor: '#fdf2f0',
      border: '1px solid #ffccd5',
      color: '#d9381e',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '20px',
      fontSize: '0.9em',
      fontWeight: '500',
      textAlign: 'center'
    },
    footerText: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '0.9em',
      color: '#666'
    },
    signupLink: {
      color: '#ff6b35',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginLeft: '5px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <main style={styles.card}>
        <h2 style={styles.title}>Welcome</h2>
        <p style={styles.subtitle}>Log in to access your BudgetBite kitchen</p>

        {/* Display UI Error banner if registration/auth fails */}
        {uiError && <div style={styles.errorBox}>⚠️ {uiError}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Log In
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? 
          <Link to="/signup" style={styles.signupLink}>Sign Up</Link>
        </p>
      </main>
    </div>
  );
}

export default Login;