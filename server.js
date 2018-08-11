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