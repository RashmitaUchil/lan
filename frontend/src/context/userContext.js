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
    const [userName,setUserName] = useState('');

    return (
        <UserContext.Provider value={{ 
            userId, setUserId,
            userName,setUserName
         }}>
            {children}
        </UserContext.Provider>
    );
};
