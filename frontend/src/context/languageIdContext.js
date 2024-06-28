import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();
    
export const useLanguageId = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguageId must be used within a LanguageIdProvider');
    }
    return context;
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
