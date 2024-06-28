const express = require("express");
const router3 = express.Router();

const Question = require("../model/Questions");

router3.get(
  "/get_questions", async (req, res) => {
    const langaugeId = req.query.l_id;
    const category = req.query.category;
    console.log(langaugeId);
    try {
      const questions = await Question.find(
        {
          l_id : langaugeId,
          category: category
        }
      );
      res.json(questions);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching questions' });
  }
});

module.exports=router3;