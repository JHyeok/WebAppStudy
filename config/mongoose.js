const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db,{useNewUrlParser : true}).then(
        (res) => {
            console.log('Connected to Database Successfully.')
        }).catch(() => {
            console.log('Conntection to database failed.')
        });
    require('../app/models/user.server.model.js');
    require('../app/models/book.server.model.js');
    return db;
}