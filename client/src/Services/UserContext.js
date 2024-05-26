import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
                    throw new Error(errorData.message || 'Failed to register user.');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Failed to register user.');
                }
            }

            const result = await response.json();
            setUser(result);
            return result; // Return the result for further handling
        } catch (error) {
            throw error; // Throw the error for the component to handle
        }
    };

    return (
        <UserContext.Provider value={{ user, register }}>
            {children}
        </UserContext.Provider>
    );
};
