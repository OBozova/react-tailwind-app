// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Profile from './components/Profile';

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const isAdmin = token && JSON.parse(atob(token.split('.')[1])).identity === 'admin';

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to={isAdmin ? '/search' : '/profile'} /> : <Login />} />
        <Route path="/profile" element={token && !isAdmin ? <Profile /> : <Navigate to="/" />} />
        <Route path="/search" element={token && isAdmin ? <Search /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
