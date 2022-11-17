const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const notifSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        date: { type: Date, default: Date.now},
        success: {type: Boolean, required: true}, //for happy or sad emoji (good/bad)
    },
    { collection: 'user-data' } 
);

const model = mongoose.model('notification', notifSchema);

module.exports = model;