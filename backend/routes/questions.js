const express = require("express");
const router3 = express.Router();

const Question = require("../model/Questions");

router3.get(
  "/get_questions", async (req, res) => {
    try {
      const questions = await Question.findOne({}, 'l_id  category question options answer'); 
      res.status(200).json(questions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports=router3;