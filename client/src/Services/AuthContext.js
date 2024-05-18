
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('auth')) || null);

    const [error, setError] = useState('');
    
    const login = (data) => {
        setAuthData(data);
        localStorage.setItem('auth', JSON.stringify(data));
    }

   


    const logout = () => {
        setAuthData(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('user'); 
        localStorage.removeItem('token'); 
         
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
