// 환경변수 설정
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express_config.js');
const mongoose = require('./config/mongoose');
const passport = require('./config/passport');

const db = mongoose();
const startapp = async () => {
    try {
        await db;
        const app = express();
        const auth = passport();
        app.listen(3000);
        module.exports = app;
        console.log('Server running at localhost:3000');
    } catch (err) {
        console.log('server error');
        console.log(err);
    }
}

startapp();