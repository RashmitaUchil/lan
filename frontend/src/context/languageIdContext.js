import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();
    
export const useLanguageId = () => {
    return useContext(LanguageContext);
};

// Create a provider component
export const LanguageIdProvider = ({ children }) => {
    const [languageId, setLanguageId] = useState('');

    return (
        <LanguageContext.Provider value={{ languageId, setLanguageId }}>
            {children}
        </LanguageContext.Provider>
    );
};
