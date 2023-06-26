const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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
            res.status(201).send({
                message: 'User Created.',
                user,
            });
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
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            )

            res.status(200).send({
                message: "Login succesful",
                user: user.username,
                token
            })
        })
        .catch((err) => {
            res.status(400).send({
                message: "Incorrect Password",
                err
            })
        })
    })
    .catch((err) => {
      response.status(404).send({
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
        res.status(200).send(`${req.body.query} already exists`);
        return;
    }
    res.status(200).send(`${req.body.query} is available`)
})


module.exports = router;