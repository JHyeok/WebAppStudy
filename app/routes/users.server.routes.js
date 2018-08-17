const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function(app) {
    app.use(function(err, req, res, next) {
        console.log(err);
    });

    app.route('/signup')
    .post(users.signup)
    .get(users.renderSingup);

    app.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/logout', users.logout);
};