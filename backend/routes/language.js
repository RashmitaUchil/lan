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
  
  module.exports = router1;