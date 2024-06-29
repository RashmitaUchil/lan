import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.css';
import { useNavigate } from 'react-router-dom';
import { useLanguageId } from './context/languageIdContext';
import { useUser } from './context/userContext'; 
import { useCategory } from './context/categoryContext';
import toast, { Toaster } from 'react-hot-toast';


const categories = ['greetings', 'nouns', 'verbs', 'Numbers and counting', 'colours'];

function Category() {
    
    
    const { userId, setUserId } = useUser();
    const { languageId } = useLanguageId();
    const { setCategory } = useCategory();
    const [completedCategories, setCompletedCategories] = useState([]);
    const navigate = useNavigate();

    const handleChooseDifferentlanguage = () => {
        // Add your logic here, for example, navigate to language selection page
        navigate('/languagePage');
      };

    useEffect(() => {

        axios.get('http://localhost:8081')
          .then(res => {
            if (res.data.valid) {
              setUserId(res.data.user_id);
              console.log(res.data.user_id);
                          
            } else {
              // Handle invalid response
            }
          });
      
        
          console.log(userId)
         axios.get(`http://localhost:8081/activity/user_activity?userId=${userId}`,{
            
                params: {
                  user_id : userId
                }
              
         })
         .then(response => {
            console.log(response.data)
            setCompletedCategories(response.data);
         }

         )
               
             
            
     
  
    }, [userId,setUserId]);

    const handleCategoryClick = async (category) => {
        try {
            // Check if there's existing user activity for this category and language
            console.log(userId)

            const existingActivity = completedCategories.find(activity => activity.category === category && activity.l_id === languageId);
    
            if (existingActivity && existingActivity.isCompleted) {
                console.log(`User has already completed ${category} for language ${languageId}`);
                toast.error("You have already completed this category")
                setCategory(category);
                return;
            }else{
    
            // Create new user activity entry
            const response = await axios.post('http://localhost:8081/activity/user_activity', {
                user_id: userId,
                l_id: languageId,
                category: category,
                isCompleted: false  // Assuming default isCompleted is false
            });
            console.log('User progress updated:', response.data);
            setCompletedCategories([...completedCategories, { category, languageId }]);
        }
    
       
            
        } catch (error) {
            console.error('Error updating user progress:', error);
        }
        console.log(`Navigating to /quiz/${category}`);
        navigate(`/quiz/${category}`);
    };
    
    const isCategoryDisabled = (index) => {
        if (index === 0) return false; // Always enable the first category
        const previousCategory = categories[index - 1];
        const prevCompleted = completedCategories.find(activity => activity.category === previousCategory && activity.l_id === languageId)?.isCompleted;
        console.log("prevvv" + languageId)
        return !prevCompleted;
    };

    return (
        <div className="category-page">
            <h1><b><i>Select a Category</i></b></h1>
            <div className="category-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-card ${completedCategories.find(activity => activity.category === category && activity.l_id === languageId && activity.isCompleted) ? 'completed' : ''} ${isCategoryDisabled(index) ? 'disabled' : ''}`}
                        onClick={() => !isCategoryDisabled(index) && handleCategoryClick(category)}
                    >
                        <div className="category-title">{category}</div>
                    </div>
                ))}
            </div>
            <button className="lang-button" onClick={handleChooseDifferentlanguage}>Explore other languages</button>
        </div>
    );
}

export default Category;