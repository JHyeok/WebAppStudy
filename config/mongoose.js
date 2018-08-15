const config = require('./config');
const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const db = await mongoose.connect(config.db, {useNewUrlParser : true});
        console.log('Connected to Database Successfully.');
        require('../app/models/user.server.model.js');
        require('../app/models/book.server.model.js');
        return db;
    } catch (err) {
        console.log('Conntection to database failed.');
    }
};