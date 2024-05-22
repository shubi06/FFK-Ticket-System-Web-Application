
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('auth')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isManualLogout, setIsManualLogout] = useState(false);

    const login = (data, token) => {
        setAuthData(data);
        setToken(token);
        setIsManualLogout(false);
        localStorage.setItem('auth', JSON.stringify(data));
        localStorage.setItem('token', token);
    };

    const logout = (isTokenExpired = false) => {
        setAuthData(null);
        setToken(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        if (isTokenExpired && !isManualLogout) {
            alert('Sesioni juaj ka përfunduar. Ju lutem kyquni përsëri.');
        }
    };

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000; 
            const currentTime = Date.now();

            if (currentTime >= expirationTime) {
                logout(true);
            } else {
                const timer = setTimeout(() => {
                    logout(true);
                }, expirationTime - currentTime);

                return () => clearTimeout(timer);
            }
        }
    }, [token]);

    const handleManualLogout = () => {
        setIsManualLogout(true);
        logout();
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout : handleManualLogout }}>
            {children}
        </AuthContext.Provider>
    );
};