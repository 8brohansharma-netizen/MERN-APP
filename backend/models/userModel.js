const mongoose = require('mongoose');

//create Schema
const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,

    },
    age: {
        type: 'number',
    },
    Password: {
        type: 'string',
        required: true,
    },
}, { timestamps: true });


userSchema.index({ email: 1 }, { unique: true });

//create Model
const User = mongoose.model('User', userSchema)

module.exports = User