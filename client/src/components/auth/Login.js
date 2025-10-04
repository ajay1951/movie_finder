// client/src/components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import our new custom Axios instance
import api from '../../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      // Use our 'api' instance here.
      const res = await api.post('/auth/login', { email, password });
      
      // The backend sends back a token, we save it
      localStorage.setItem('token', res.data.token);
      
      // Redirect to the homepage after successful login
      navigate('/');
      window.location.reload(); // Force a reload to update the auth state everywhere
    } catch (err) {
      // Handle errors from the server response
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;