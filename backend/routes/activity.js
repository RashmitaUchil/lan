const express = require("express");
const router4 = express.Router();
const Activity=require("../model/User_activities");

router4.post( "/user_activity", async (req, res) => {
    // const { user_id, l_id, category } = req.body;
    const user_id = req.body.user_id
    const l_id = req.body.l_id
    const category = req.body.category
    try {
        
         // Update or create user progress
          const userActivity = await Activity.findOneAndUpdate(
              { user_id, l_id, category },
              { $set: { isCompleted: false } },
              { upsert: true, new: true }
         );
    
          // Validate request
          if (!user_id || !l_id || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
         }
    
         res.json(userActivity);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user activity', error });
       }
});
router4.get('/user_activity', async (req, res) => {
    const { userId } = req.params;
    try {
        const progress = await Activity.find({ userId });
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router4;
  