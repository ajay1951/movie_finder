// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchLater from './components/WatchLater';
import Register from './components/auth/Register'; // <-- Import Register
import Login from './components/auth/Login';       // <-- Import Login
import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/register" element={<Register />} /> {/* <-- Add Register Route */}
          <Route path="/login" element={<Login />} />       {/* <-- Add Login Route */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watch-later" element={<WatchLater />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;