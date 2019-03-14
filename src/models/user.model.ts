const mongoose = require('mongoose');
const { Schema } = mongoose;

const logger = require('../winston');

const UserSchema = new Schema({
    age: {
        type: Number,
    },
    birthday: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);
