import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.css';
import { useNavigate } from 'react-router-dom';
import { useLanguageId } from './context/languageIdContext';
import { useUser } from './context/userContext'; 
import { useCategory } from './context/categoryContext';

const categories = ['greetings', 'nouns', 'verbs', 'Numbers and counting', 'colours'];

function Category() {
    
    
    const { userId } = useUser(); // Assuming useUser provides userId
    const { languageId } = useLanguageId();
    const { setCategory } = useCategory();
    const [completedCategories, setCompletedCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch completed categories for the user
        const fetchCompletedCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/activity/user_activity/${userId}`);
                // setCompletedCategories(response.data.map(activity => ({
                //     category: activity.category,
                //     languageId: activity.l_id,
                //     isCompleted: activity.isCompleted
                // })));
                setCompletedCategories(response.data);
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        };

        fetchCompletedCategories();
    }, [userId]);

    const handleCategoryClick = async (category) => {
        try {
            // Check if there's existing user activity for this category and language
            const existingActivity = completedCategories.find(activity => activity.category === category && activity.languageId === languageId);
    
            if (existingActivity && existingActivity.isCompleted) {
                console.log(`User has already completed ${category} for language ${languageId}`);
                setCategory(category);
                navigate('/quiz');
                return;
            }
    
            // Create new user activity entry
            const response = await axios.post('http://localhost:8081/activity/user_activity', {
                user_id: userId,
                l_id: languageId,
                category: category,
                isCompleted: false  // Assuming default isCompleted is false
            });
    
            console.log('User progress updated:', response.data);
            setCompletedCategories([...completedCategories, { category, languageId }]);
            
        } catch (error) {
            console.error('Error updating user progress:', error);
        }
        console.log(`Navigating to /quiz/${category}`);
        navigate(`/quiz/${category}`);
    };
    
    const isCategoryDisabled = (index) => {
        if (index === 0) return false; // Always enable the first category
        const previousCategory = categories[index - 1];
        const prevCompleted = completedCategories.find(activity => activity.category === previousCategory && activity.languageId === languageId)?.isCompleted;
        return !prevCompleted;
    };

    return (
        <div className="category-page">
            <h1><b><i>Select a Category</i></b></h1>
            <div className="category-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-card ${completedCategories.find(activity => activity.category === category && activity.languageId === languageId && activity.isCompleted) ? 'completed' : ''} ${isCategoryDisabled(index) ? 'disabled' : ''}`}
                        onClick={() => !isCategoryDisabled(index) && handleCategoryClick(category)}
                    >
                        <div className="category-title">{category}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;