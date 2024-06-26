import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.css';

import { useLanguageId } from './context/languageIdContext';
import { useUser } from './context/userContext.js'; 


const categories = ['Greetings', 'Nouns', 'Verbs', 'Numbers', 'Colours'];

function Category() {
    
    const { languageId } = useLanguageId();
    const { userId } = useUser(); 
    const [completedCategories, setCompletedCategories] = useState([]);

    useEffect(() => {
        // Fetch completed categories for the user
        const fetchCompletedCategories = async () => {
            try {
                const response = await axios.get(`/api/user_progress/${userId}`);
                setCompletedCategories(response.data.completedCategories);
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        };

        fetchCompletedCategories();
    }, [userId]);

    const handleCategoryClick = async (category) => {
        try {
            const response = await axios.post('http://localhost:8081/activity/user_activity', {
                user_id:userId,
                l_id:languageId, 
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
                    <div key={index} className="category-card" style={{ marginBottom: '20px' }}>
                        <div
                            className={`category-title ${completedCategories.includes(category) ? 'completed' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
