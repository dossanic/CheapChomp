// src/views/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const { supabase } = require('../services/supabaseClient');

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uiError, setUiError] = useState(null);
  const [uiSuccess, setUiSuccess] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setUiError(null);
    setUiSuccess(false);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password,
    });

    if (error) {
      setUiError(error.message);
      return;
    }

    console.log('Signup data:', data);
    setUiSuccess(true);
    
    // Smooth transition delay so users see the success message before redirecting
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
    successBox: {
      backgroundColor: '#f0fbf4',
      border: '1px solid #c6f6d5',
      color: '#22543d',
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
    loginLink: {
      color: '#ff6b35',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginLeft: '5px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <main style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join BudgetBite to track pantry costs and recipes</p>

        {/* Dynamic Alerts */}
        {uiError && <div style={styles.errorBox}>⚠️ {uiError}</div>}
        {uiSuccess && (
          <div style={styles.successBox}>
            🎉 Account created successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSignup}>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength="6"
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Sign Up
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? 
          <Link to="/login" style={styles.loginLink}>Log In</Link>
        </p>
      </main>
    </div>
  );
}

export default Signup;