
import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api', // This will be prefixed to all request URLs
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
