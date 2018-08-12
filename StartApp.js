// 환경변수 설정
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express_config.js');
const mongoose = require('./config/mongoose');

const db = mongoose();
const app = express();
app.listen(5000);
module.exports = app;

console.log('Server running at localhost');
