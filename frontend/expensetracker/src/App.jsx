import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Income from './Dashboard/Income';
import Expense from './Dashboard/Expense';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './Dashboard/Home';
import Homepage from './pages/Homepage';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  </UserProvider>
);

export default App;
