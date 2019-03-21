import * as passport from 'passport';
import { IUserUpdateBody } from '../interfaces/user.interface';
import { IUserRegisterBody } from '../interfaces/user.interface';

const User = require('../models/user.model');

export class UserController {
    public logger = require('../winston');

    // -------------------- CREATE --------------------
    public createUser = async (req, res) => {
        const user = new User({
            age: req.body.age,
            birthday: req.body.birthday,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        await user.save();
        res.json({
            status: 'Employee saved!!',
        });
    }

    // -------------------- READ --------------------
    public getUsers = async (req, res) => {
        const users = await User.find();
        res.json(users);
    }

    public getUserById = async (req, res) => {
        const user = await User.findById(req.params.id);
        res.json(user);
    }

    // -------------------- UPDATE --------------------
    public updateUser = async (req, res) => {
        const { id } = req.params;
        const user = {
            age: req.body.age,
            birthday: req.body.birthday,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        await User.findByIdAndUpdate(id, { $set: user }, { new: true });
        res.json({ status: 'Employee updated' });
    }

    // -------------------- DELETE --------------------
    public deleteUser = async (req, res) => {
        await User.findByIdAndRemove(req.params.id);
        res.json({ status: 'Employee deleted' });
    }

    // -------------------- LOGIN --------------------
    public login = async (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.status(404).json(err);
            } else {
                if (user) { // The user was found
                    if (user.deleted) {
                        res.status(404).json(err);
                    } else {
                        res.status(200).json({ token: user.generateJwt() });
                    }
                } else {
                    // user is not found
                    res.status(401).json(info);
                }
            }
        });
    }

    // ------------------- REGISTER ------------------
    public register = async (req, res) => {
        const userData: IUserRegisterBody = req.body;
    }
}

export default new UserController();
