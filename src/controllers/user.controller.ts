const User = require('../models/user.model').User;

export class UserController {
    // ...............Create ...............
    public createUser = async (req, res) => {
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
    // Read
    public getUsers = async (req, res) => {
        const users = await User.find();
        res.json(users);
    }
    // Update
    // Delete
}

module.exports = new UserController();