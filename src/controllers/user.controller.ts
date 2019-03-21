import { IUserUpdateBody } from '../interfaces/user.interface';
import { IUserRegisterBody } from '../interfaces/user.interface';

const User = require('../models/user.model');

export class UserController {
    public logger = require('../winston');

    // -------------------- CREATE --------------------
    public createUser = async (req, res) => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            updatePassword: req.body.updatePassword,
        });
        await User.save();
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            updatePassword: req.body.updatePassword,
        };
        await User.findByIdAndUpdate(id, { $set: user }, { new: true });
        res.json({ status: 'Employee updated' });
    }

    // -------------------- DELETE --------------------
    public deleteUser = async (req, res) => {
        await User.findByIdAndRemove(req.params.id);
        res.json({ status: 'Employee deleted' });
    }

    // ------------------- REGISTER ------------------
    public register = async (req, res) => {
        const userData: IUserRegisterBody = req.body;
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            updatePassword: true,
        });
        if (userData.password) {
            user.setPassword(userData.password);
            user.save((err) => {
                if (err) {
                    res.status(404).json(err);
                } else {
                    res.status(200).json({ token: user.generateJwt() });
                }
            });
        } else {
            res.json({ status: 'must set a password' });
        }
    }
}

export default new UserController();
