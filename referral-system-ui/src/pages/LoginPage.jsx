import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleRegister = () => {
    console.log("Inside Handle Register")
    navigate("/register")
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      const { user } = response.data;
      onLogin(user);
    //   setUserData(response)
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
        {/* <NavLink to={"/"}>Register</NavLink> */}
      </form>
    </div>
  );
};

export default LoginPage;
