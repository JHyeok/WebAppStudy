// 환경변수 설정
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express_config.js');
const mongoose = require('./config/mongoose');
const passport = require('./config/passport');

const db = mongoose();
const server = async () => {
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

server();

/*
var express = require('express');
var app = express();

var question = function(req, res, next) {
    if(req.param('answer')){
        next();
    } else {
        res.send('so what is your answer?');
    }
};

var result = function(req, res) {
    res.send('good');
};

app.get('/', question,  result);
app.listen(3000);

console.log('Server running at http://localhost:3000');

*/