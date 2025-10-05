// client/src/api/axios.js
import axios from 'axios';

// Create an instance that points to our Render backend
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // e.g., https://your-backend.onrender.com
});

// Use an interceptor to add the auth token to every request sent with this instance
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  //error => Promise.reject(error)
);

export default api;