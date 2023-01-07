const mongoose = require('mongoose');

// schema describing user in db
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verified: { type: Boolean, required: true, default: false },
    },
    { collection: 'users' }
);

const model = mongoose.model('user', userSchema);

module.exports = model;