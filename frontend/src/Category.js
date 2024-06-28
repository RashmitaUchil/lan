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
                setCompletedCategories(response.data.isCompleted);
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        };

        fetchCompletedCategories();
    }, [userId]);

    const handleCategoryClick = async (category) => {
        // try {
        //     console.log(userId, languageId,category)

        //     const response = await axios.post('http://localhost:8081/activity/user_activity', {
        //         user_id :userId,
        //         l_id :languageId, 
        //         category :category
        //     });
        //     console.log('User progress updated:', response.data);
        //     setCompletedCategories([...completedCategories, category]);
        //     console.log(category)
        //     setCategory(category);
        //     navigate('/quiz');
        // } catch (error) {
        //     console.error('Error updating user progress:', error);
        // }
        console.log(`Navigating to /quiz/${category}`);
        navigate(`/quiz/${category}`);
    };

    return (
        <div className="category-page">
            <h1><b><i>Select a Category</i></b></h1>
            <div className="category-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-card ${completedCategories.includes(category) ? 'completed' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="category-title">{category}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;