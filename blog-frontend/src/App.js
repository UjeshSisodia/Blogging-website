import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import './App.css';

function NavBar({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/blogs" className="navbar-brand">BlogHub</Link>
        {token && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/login" element={
          token ? <Navigate to="/blogs" replace /> : <Login setToken={setToken} />
        } />
        
        <Route path="/blogs" element={
          token ? <BlogList token={token} /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/blogs/:id" element={
          token ? <BlogDetails token={token} /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/" element={<Navigate to="/blogs" replace />} />
      </Routes>
    </Router>
  );
}

export default App;