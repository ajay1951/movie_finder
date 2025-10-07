// client/src/api/axios.js
import axios from 'axios';

// Create a simple Axios instance.
// DO NOT set a baseURL here. Let the environment handle it.
// - Locally, the "proxy" in package.json will route the request.
// - In production, Vercel/Render rewrites will route the request.
const api = axios.create({});

// Use an interceptor to add the auth token to every request sent with this instance
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;