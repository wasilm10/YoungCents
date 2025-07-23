import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('main');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError(null);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
        loginType: loginType === 'father' ? 'father' : undefined,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page relative min-h-screen bg-gray-900 text-white">
      {/* ✅ Home button at top-left corner */}
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
      >
        ← Home
      </Link>

      <div className="wrapper">
        <div className="form-box">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <select
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '40px',
                  fontSize: '16px',
                  color: '#fff',
                  padding: '20px',
                  outline: 'none',
                }}
              >
                <option value="main">Main User</option>
                <option value="father">Father</option>
              </select>
            </div>

            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
