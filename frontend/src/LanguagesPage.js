import React, { useState, useEffect } from 'react';
import './LanguagesPage.css';

function LanguageList() {
  const [languages, setLanguages] = useState(null);
 
 useEffect(()=>
    {
      language()
    },[])

  const language = async() =>
    {
      const response = await fetch('http://localhost:8081/language/get_languages');

      setLanguages(await response.json())
      console.log(response);
    }

    const handleLanguageClick = (languageId) => {
      setLanguages(languages.l_id);
  
    };

  return (
 
    <div><center><h1>Select The Language</h1></center>
    <div className="language-cards-container">
      <ul className="language-cards-list">
        {languages.map((language) => (
          <li className="language-card-item"
          key={language.l_id}
          onClick={() => handleLanguageClick(language.l_id)}>
            <div className="language-card">
              <div className="language-card-content">
                <h3><i>{language.lang_name}</i></h3>
                <div className="language-card-flag">
                  <img src={language.flag_url} alt={`${language.lang_name} Flag`} width="100" height="70" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default LanguageList;