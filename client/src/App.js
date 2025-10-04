// client/src/App.js

// --- All imports are grouped at the top ---
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component Imports
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchLater from './components/WatchLater';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// CSS Imports
import './App.css';


// --- Helper Component for Private Routes ---
// This component checks if a user is logged in based on the presence of a token.
// If logged in, it renders the child route (using <Outlet />).
// If not logged in, it redirects the user to the /login page.
const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <Navbar />
      
      {/* This component from react-toastify is responsible for displaying all notifications */}
      <ToastContainer 
        theme="dark" 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
      />
      
      <div className="App">
        <Routes>
          {/* --- PUBLIC ROUTES (accessible to everyone) --- */}
          <Route path="/" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> 

          {/* --- PRIVATE ROUTES (require user to be logged in) --- */}
          {/* The PrivateRoute component acts as a gatekeeper for all nested routes. */}
          <Route element={<PrivateRoute />}>
            <Route path="/watch-later" element={<WatchLater />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;