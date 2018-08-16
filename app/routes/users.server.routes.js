const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
    .post(users.signup)
    .get(users.renderSingup);

    app.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
        successRedirct : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/logout', users.logout);
};