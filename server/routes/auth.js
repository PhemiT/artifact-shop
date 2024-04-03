const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const passport = require('../config/passport');

require('dotenv').config('../../server');


router.post('/register', (req, res) => {
    console.log(req.body)
    if (!req.body.password) {
        return res.status(400).send({
            message: 'Password is required'
        });
    }
    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        user.save()
        .then((user) => {
            const token = jwt.sign(
                { 
                    userId: user._id,
                    userName: user.username
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: "3h" });

                res.status(201).send({
                    message: 'User Created.',
                    token
                }).cookie('jwt', token, { httpOnly: true, secure: true });
        }).catch((err) => {
            console.error(err);
            res.status(500).send({
                message: 'Error adding user',
                err,
            });
        });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send({
            message: 'Error hashing password',
            err,
        });
    });
});

router.post('/login', (req, res) => {
    const userQuery = new RegExp(`^${req.body.username}$`, 'i')
    User.findOne({ 
        $or: 
        [
            { username: { $regex: userQuery } },
            { email: { $regex: userQuery } }
        ]
    })
    .then((user) => {
        bcrypt.compare(req.body.password, user.password)
        .then((passCheck) => {
            if (!passCheck) {
                return res.status(400).send({
                    message: "Incorrect Password", err
                })
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    userName: user.username
                },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            )

            res.status(200).send({
                message: "Login succesful",
                token
            }).cookie('jwt', token, { httpOnly: true, secure: true });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Incorrect Password",
                err
            })
        })
    })
    .catch((err) => {
      response.status(404).json({
        message: "User doesn't Exist",
        err,
      });
    });
})

router.post('/validate-exists', async (req, res) => {
    const query = new RegExp(`^${req.body.query}$`, 'i');
    const userQuery = await User.findOne({ 
        $or: 
        [
            { username: { $regex: query } },
            { email: { $regex: query } }
        ]
    });
    if (userQuery) {
        res.status(200).json({ message: `${req.body.query} already exists` });
        return;
    }
    res.status(200).json({ message: `${req.body.query} is available` });
})

// Google Authentication Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback', (req, res) => {
    passport.authenticate('google', async (err, user, info) => {
      if (err) {
        console.error('Google authentication error:', err);
        return res.redirect('/failure?error=' + encodeURIComponent(err.message));
      }
  
      if (!user) {
        console.error('Google authentication failed:', info);
        return res.redirect('/failure?error=' + encodeURIComponent(info.message || 'Authentication failed'));
      }
  
      try {
        const token = jwt.sign(
        { 
            userId: user._id, 
            userName: user.username
        },
          process.env.JWT_SECRET,
          { expiresIn: '1m' }
        );
  
        res.redirect(`${process.env.CLIENT_APP_URL}?token=${token}`);
      } catch (err) {
        console.error('Error generating token:', err);
        return res.redirect('/failure?error=' + encodeURIComponent(err.message));
      }
    })(req, res);
  });


module.exports = router;