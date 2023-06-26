const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: [true, 'Please input email'],
        type: String,
        unique: [true, 'Username already exists']
    },
    username: {
        required: [true, 'Please input username'],
        type: String,
        unique: [true, 'Username already exists']
    },
    password: {
        required: [true, 'Please input password'],
        type: String,
        unique: false
    }
});

module.exports = mongoose.model('Users', userSchema);