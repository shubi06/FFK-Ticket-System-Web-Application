import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:5178/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                if (response.headers.get('Content-Type')?.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(`Failed to register user: ${errorData.message || JSON.stringify(errorData)}`);
                } else {
                    // This handles non-JSON responses, assuming they are plain text
                    const errorText = await response.text();
                    throw new Error(`Failed to register user: ${errorText}`);
                }
            }
    
            const result = await response.json();
            setUser(result);
        } catch (error) {
            setError(error.message);
        }
    };
    
    
    return (
        <UserContext.Provider value={{ user, register, error }}>
            {children}
        </UserContext.Provider>
    );
};
