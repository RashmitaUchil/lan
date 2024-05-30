import React, { createContext, useContext, useState } from 'react';

// Create a Context for the user ID
const UserContext = createContext();
    
// Create a custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState('');

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
