import { Document, Schema, Model, model, Types} from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const cryptoPass = require('crypto');
const jwt = require('jsonwebtoken');

const env = require('../../config/environment');

export interface IUserModel extends IUser, Document {
    _id: Types.ObjectId;
    _username: Types.ObjectId;
    hash: String;
    salt: String;
}

export let UserSchema = new Schema({
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
    },
);

UserSchema.methods.setPassword = function(password) {
    this.salt = cryptoPass.randomBytes(16).toString('hex');
    this.hash = cryptoPass.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    const hash = cryptoPass.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: expiry.getTime() / 1000,
    }, env.JWT_SECRET);
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);