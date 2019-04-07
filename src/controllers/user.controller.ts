const User = require('../models/user.model').User;

export class UserController {
    // ...............Create ...............
    public createUser = async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            res.json({
                'status': 'user FOUND, the user will not be created again'
            })
        } else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                updatePassword: req.body.updatePassword
            });

            if (req.body.password) {
                user.setPassword(req.body.password);
                await user.save();
                const token = user.generateJwt();
                res.json({
                    'Token': token
                })
            } else {
                res.json({
                    'status': 'user not saved something, password is missing'
                })
            }
        }
    }

    // ......................... Read ...........................
    public getUsers = async (req, res) => {
        const users = await User.find();
        res.json(users);
    }
    public getUserById = async (req, res) => {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    public getUserByUsername = async (req, res) => {
        const user = await User.findOne({ "username": req.params.username });
        res.json(user);
    }

    // Update
    public updateUser = async (req, res) => {
        const { id } = req.params;
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            updatePassword: req.body.updatePassword
        }
        await User.findByIdAndUpdate(id, { $set: user }, { new: true });
        res.json({ status: 'User updated' });
    }

    // Delete
    public deleteUser = async (req, res) => {
        await User.findByIdAndRemove(req.params.id);
        res.json({ status: 'User deleted' });
    }
}

module.exports = new UserController();