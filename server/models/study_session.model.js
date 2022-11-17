const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const studySeshSchema = new mongoose.Schema(
    {
        duration: { type: String, required: true },
        success: { type: Boolean, required: true }, //for happy or sad emoji //failed or successsful
        date: { type: Date, default: Date.now}, //keep track of dates
        cycles: {type: Integer, required: true}

        
    },
    { collection: 'user-data' } //are we storing these in the same collection? or
                                //do we want to have a diff collection and cross reference
);

const model = mongoose.model('study-session', studySeshSchema);

module.exports = model;