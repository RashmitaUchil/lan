const express = require("express");
const router4 = express.Router();
const Activity = require("../model/User_activities");

// POST route to update user activity
router4.post("/user_activity", async (req, res) => {
    const { user_id, l_id, category, isCompleted } = req.body;
    
    if (!user_id || !l_id || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Update or create user progress
        const userActivity = await Activity.findOneAndUpdate(
            { user_id, l_id, category },
            { $set: { isCompleted } },
            { upsert: true, new: true }
        );
        res.json(userActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user activity', error });
    }
});

// GET route to fetch user activities
router4.get('/user_activity/', async (req, res) => {
    const { userId } = req.params;
    try {
        const progress = await Activity.find({ user_id: userId });
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router4.get('/user_activity/status', async (req, res) => {
    const { user_id, l_id, category } = req.query;
    try {
        const userActivity = await Activity.findOne({ user_id, l_id, category });
        if (!userActivity) {
            return res.status(404).json({ message: 'User activity not found' });
        }
        res.status(200).json({ isCompleted: userActivity.isCompleted });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user activity status', error });
    }
});
module.exports = router4;
