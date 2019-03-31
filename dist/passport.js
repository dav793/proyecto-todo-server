const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
passport.use(new LocalStrategy({
    usernameField: 'username',
}, (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        else {
            if (!user) {
                return done(null, false, {
                    message: 'User not found',
                });
            }
            else {
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Password is wrong',
                    });
                }
                else {
                    return done(null, user);
                }
            }
        }
    });
}));
//# sourceMappingURL=passport.js.map