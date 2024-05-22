import React, { useState, useEffect } from 'react';

function LanguageList() {
  const [languages, setLanguages] = useState([]);

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
  
  return (
    <div>
      <center><h1><i>Languages</i></h1></center>
      <ul>
        {languages.map(language =>
        
        (
          <li key={language.l_id}>
            <span>{language.lang_name}</span>
            <img src={language.flag_url} alt={language.lang_name} />
          </li>
        )
        )}
      </ul>
    </div>
  );
}

export default LanguageList;