import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create auth context
const AuthContext = createContext();

// API URL from environment or default
// In browser environment, we need to use the external URL
// When server-side rendering or in Docker, we use the internal URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// For debugging
console.log('Using API URL:', API_URL);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // If token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Failed to authenticate user');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        navigate('/dashboard');
        return { success: true };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to the server');
      return { success: false, message: 'Failed to connect to the server' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        navigate('/dashboard');
        return { success: true };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to connect to the server');
      return { success: false, message: 'Failed to connect to the server' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const response = await fetch(`${API_URL}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prevUser => ({ ...prevUser, ...data.user }));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Failed to connect to the server' };
    }
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 