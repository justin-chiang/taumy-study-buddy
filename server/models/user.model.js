const mongoose = require('mongoose');

// schema describing user in db
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: 'user-data' }
);

const model = mongoose.model('user', userSchema);

module.exports = model;