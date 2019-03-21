"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../../config/environment");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cryptoPass = require('crypto');
const jwt = require('jsonwebtoken');
const UserSchema = new Schema({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    updatePassword: {
        type: Boolean,
        default: false,
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
}, {
    timestamps: true,
});
UserSchema.methods.setPassword = (password) => {
    this.salt = cryptoPass.randomBytes(16).toString('hex');
    this.hash = cryptoPass.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};
UserSchema.methods.validPassword = (password) => {
    const hash = cryptoPass.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};
UserSchema.methods.generateJwt = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: expiry.getTime() / 1000,
    }, environment_1.env.JWT_SECRET);
};
module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map