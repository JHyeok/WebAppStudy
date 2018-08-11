console.log('start http server');

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {
         'Content-Type' : 'text/html; charset=utf-8'
        });
    res.write('안녕하신가 친구여\r\n');
    res.write('난 잘지내고 있다네\r\n');
    res.end('Hello world!!');
}).listen(3000);

console.log('Server running at http://localhost:3000/');