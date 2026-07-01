// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Dashboard from './views/Dashboard';
import RecipeBrowser from './views/RecipeBrowser';
import Login from './views/Login';
import Signup from './views/Signup';

import { supabase } from './services/supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // State can track: 'dashboard', 'browser', or 'saved'
  const [currentView, setCurrentView] = useState('dashboard');
  
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    }

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center', color: '#ff6b35' }}>
        <h3>Authenticating Session...</h3>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ======================================================================= */}
        {/* PUBLIC AUTH ROUTES                                                      */}
        {/* ======================================================================= */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/" replace />} 
        />

        {/* ======================================================================= */}
        {/* PROTECTED APP VIEWPORT (Combines State View Tracking & Auth Guard)      */}
        {/* ======================================================================= */}
        <Route
          path="/"
          element={
            user ? (
              <div>
                {/* Pass the state setter down to your updated Header */}
                <Header setView={setCurrentView} user={user} />
                
                <main>
                  {/* 1. Pantry Dashboard (Homepage) */}
                  {currentView === 'dashboard' && <Dashboard />}
                  
                  {/* 2. Global Edamam Recipe Browser */}
                  {currentView === 'browser' && <RecipeBrowser />}

                  {/* 3. Saved Recipes Page (Placeholder for Phase 5) */}
                  {currentView === 'saved' && (
                    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
                      <h2 style={{ color: '#333', borderBottom: '2px solid #fff3ee', paddingBottom: '10px' }}>
                        Your Saved Collections
                      </h2>
                      <p style={{ color: '#777', fontStyle: 'italic', marginTop: '20px' }}>
                        Saved recipes dashboard database persistence layer coming soon in Phase 5!
                      </p>
                    </div>
                  )}
                </main>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all fallback path back to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;