const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({
            userid : username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message : '알 수 없는 유저'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message : '패스워드가 틀렸습니다.'
                });
            }
            return done(null, user);
        });
    }));
};