"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cryptoPass = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../../config/environment');
exports.UserSchema = new mongoose_1.Schema({
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
exports.UserSchema.methods.setPassword = function (password) {
    this.salt = cryptoPass.randomBytes(16).toString('hex');
    this.hash = cryptoPass.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};
exports.UserSchema.methods.validPassword = function (password) {
    const hash = cryptoPass.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};
exports.UserSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: expiry.getTime() / 1000,
    }, env.JWT_SECRET);
};
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.model.js.map