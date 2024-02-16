const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        unique: true,
        primaryKey: true
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;