import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('auth')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isManualLogout, setIsManualLogout] = useState(false);

  const login = (userData, token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      setAuthData(userData);
      setToken(token);
      setIsManualLogout(false);
      localStorage.setItem('auth', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userData.userId); // Save userId to localStorage
      console.log('Logged in with new token:', token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const deleteCookie = (name, path, domain) => {
    document.cookie = name + `=; Path=${path}; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  const logout = (isTokenExpired = false) => {
    setAuthData(null);
    setToken(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 

    deleteCookie('refreshToken', '/', 'localhost');

    if (isTokenExpired && !isManualLogout) {
      alert('Your session has expired. Please log in again.');
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      const timeUntilRefresh = expirationTime - currentTime - 60000;

      if (timeUntilRefresh <= 0) {
        refreshAuthToken();
      } else {
        const timer = setTimeout(() => {
          refreshAuthToken();
        }, timeUntilRefresh);

        return () => clearTimeout(timer);
      }
    }
  }, [token]);

  const handleManualLogout = () => {
    setIsManualLogout(true);
    logout();
  };

  const refreshAuthToken = async () => {
    try {
      console.log('Sending refresh token request...');
      const response = await axios.post(
        'http://localhost:5178/api/account/refresh-token',
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Refresh token response:', response.data);

      const newToken = response.data.token;
      const decodedToken = jwtDecode(newToken);

      const userData = {
        userId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };

      login(userData, newToken);
    } catch (error) {
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        logout(true);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout: handleManualLogout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
