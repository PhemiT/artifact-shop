const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    collectorName: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Item', itemSchema);