const express = require("express");
const router1 = express.Router();

const Language = require("../model/Language");

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
  const userId = req.body.userId
  const languageId = req.body.languageId

  const user = await User.findOne({
    "user_id" : userId,
  });
  await user.languages.push(languageId)
  res.status(200).json({
    message : 'language updated succesfully'
  })
}catch(err){
  res.status(400)
}   
});


  
  module.exports = router1;