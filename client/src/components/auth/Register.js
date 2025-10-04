// client/src/components/auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import our new custom Axios instance
import api from '../../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      // Use our 'api' instance here.
      // Notice we only need to provide the endpoint, not the full '/api/...' path.
      await api.post('/auth/register', { name, email, password });
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      // Handle errors from the server response
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
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
          minLength="6"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;