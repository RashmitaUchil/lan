const express = require("express");
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const {v4}= require ("uuid");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const session= require('express-session');
const cookieParser= require('cookie-parser');

const User = require("../model/User");



router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min:6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array()
            });
        }

        const {
            username:username,
            email:email,
            password:password,
            
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).send({
                    message: "Email is already registered"
                });
            }

            user = await User.findOne({
                username
            });
            if (user) {
                return res.status(400).send({
                  message: "Username Already Exists"
                });
            }
            const userId = await v4();
          
                user = new User({
                username : username,
                email :email,
                password : password,
                user_id : userId
                
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send({message:"Error in Saving"});
        }
    }
);

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        
        return res.status(400).send({
          errors: errors.array()
        });
      }
      const { email, password } = req.body;
    try {
      let user = await User.findOne({

        email
      });
      
      if (!user)
        return res.status(400).send({
          message: "User Does Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) {
            throw err;
          }else{
           req.session.userId = user.user_id;
          req.session.userName = user.username;
          
         req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
            return res.status(500).send({ error: 'Session save error' });
          }
          console.log(req.session.userName);
          return res.status(200).json({ token });
        });
          
        }
      }   );
    } catch (e) {
      console.error(e);
     return res.status(500).send({
        message: "Server Error"
      });
    }
  }
);
  

router.get('/logout', async (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to destroy session');
    }
    res.clearCookie('connect.sid'); // Adjust cookie name based on your session settings
    res.status(200).send('Logged out');
  });
})
module.exports = router;