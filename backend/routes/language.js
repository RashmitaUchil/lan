const express = require("express");
const router1 = express.Router();

const Language = require("../model/Language");
const User = require("../model/User");

router1.get(
  "/get_languages", async (req, res) => {
    try {
      const languages = await Language.find({}, 'l_id lang_name flag_url'); // Fetch only id, name, and flagUrl fields
      res.status(200).json(languages);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

router1.post( "/select_language", async (req, res) => {
  try{
  const userId = req.body.user_id
  const languageId = req.body.l_id
  
 
   const user = await User.findOneAndUpdate(
     { user_id : userId},
    { $push: { languages: languageId } },
    { new: true, useFindAndModify: false }
);
if(user == null){
  console.log('user not found')
}

  
  res.status(200).json({
    message : 'language updated successfully'
  })
}catch(err){
  console.log(err.message)
  return res.status(400)
}   
});

  module.exports = router1;