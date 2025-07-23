import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fathermail, setFathermail] = useState('');
  const [fatherpassword, setFatherpassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!validateEmail(email) || !validateEmail(fathermail)) {
      setError('Please enter valid email addresses');
      return;
    }

    if (password.length < 6 || fatherpassword.length < 6) {
      setError('Passwords must be at least 6 characters long');
      return;
    }

    if (email.toLowerCase() === fathermail.toLowerCase()) {
      setError('Email and father email must be different');
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        fathermail,
        fatherpassword,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page relative min-h-screen bg-gray-900 text-white">
      {/* ✅ Home button (top-left corner) */}
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
      >
        ← Home
      </Link>

      <div className="wrapperb">
        <div className="form-box">
          <form onSubmit={handleSignup}>
            <h1>Sign Up</h1>
            {error && <div className="error-message">{error}</div>}

            <div className="input-box">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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
              <input
                type="email"
                placeholder="Father's Email"
                value={fathermail}
                onChange={(e) => setFathermail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Father's Password"
                value={fatherpassword}
                onChange={(e) => setFatherpassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Sign Up</button>
            <div className="register-link">
              <p>
                Already have an account? <Link to="/login">Go to Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
