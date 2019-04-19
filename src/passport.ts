const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'username',
},
    (username, password, done) => {
        // tslint:disable-next-line:object-literal-shorthand
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            } else {
                // Return if user not found in database
                if (!user) {
                    return done(null, false, {
                        message: 'User not found',
                    });
                } else {
                    // Return if password is wrong
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Password is wrong',
                        });
                    } else {
                        // If credentials are correct, return the user object
                        return done(null, user);
                    }
                }
            }
        });
    },
));
