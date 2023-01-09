const mongoose = require('mongoose');

// schema describing session in db
const sessionSchema = new mongoose.Schema(
    {
        user: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        duration: { type: Number, required: true },
        success: { type: Boolean, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    {
        timestamps: true
    },
    { collection: 'sessions' }
);

const model = mongoose.model('session', sessionSchema);

module.exports = model;