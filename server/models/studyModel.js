const mongoose = require('mongoose');

// schema describing user in db
const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        duration: { type: String, required: true },
        success: { type: Boolean, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        date: { type: String, required: true },
    },
    {
        timestamps: true
    },
    { collection: 'study-data' }
);

const model = mongoose.model('session', sessionSchema);

module.exports = model;