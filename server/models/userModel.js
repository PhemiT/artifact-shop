const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: [true, 'Please input username'],
        type: String,
        unique: [true, 'Username already exists']
    },
    password: {
        required: [true, 'Please input password'],
        type: String,
        unique: false
    },
    /* role: {
        type: String,
        default: ["Client"]
    } */
});

module.exports = mongoose.model('Users', userSchema);