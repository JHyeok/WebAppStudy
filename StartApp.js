// 환경변수 설정
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express_config.js');
const mongoose = require('./config/mongoose');

const db = mongoose();

db.then((res) => {
    // 응답완료 app start
    const app = express();
    app.listen(5000);
    console.log('Server running at localhost');
    }).catch(() => {
    // 응답실패
    console.log('Server error');
    });
    