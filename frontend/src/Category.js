import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.css';

import { useLanguageId } from './context/languageIdContext';
import { useUser } from './context/userContext.js'; 


const categories = ['Greetings', 'Nouns', 'Verbs', 'Numbers', 'Colours'];

function Category() {
    
    const { languageId } = useLanguageId();
    const { userId } = useUser(); // Assuming useUser provides userId

    const handleCategoryClick = async (category) => {
        try {
            console.log(userId, languageId,category)

            const response = await axios.post('http://localhost:8081/activity/user_activity', {
                user_id,
                l_id, 
                category
            });
            console.log('User progress updated:', response.data);
        } catch (error) {
            console.error('Error updating user progress:', error);
        }
    };

    return (
        <div className="category-page">
            <h1>Select a Category</h1>
            <div className="category-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-card"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
