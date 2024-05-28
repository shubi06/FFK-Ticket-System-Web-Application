import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('auth')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isManualLogout, setIsManualLogout] = useState(false);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);

    const login = (data, token) => {
        setAuthData(data);
        setToken(token);
        setIsManualLogout(false);
        localStorage.setItem('auth', JSON.stringify(data));
        localStorage.setItem('token', token);
        console.log('Logged in with new token:', token);
    };

    const deleteCookie = (name, path, domain) => {
        document.cookie = name + `=; Path=${path}; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }

    const logout = (isTokenExpired = false) => {
        setAuthData(null);
        setToken(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        
        deleteCookie('refreshToken', '/', 'localhost'); 
        
        if (isTokenExpired && !isManualLogout) {
            alert('Sesioni juaj ka përfunduar. Ju lutem kyquni përsëri.');
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
            const decoded = jwtDecode(newToken);

            const userData = {
                name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
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
        <AuthContext.Provider value={{ authData, login, logout: handleManualLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
