const express = require('express');
const morgan = require('morgan'); //morgan :  로거 미들웨어 제공 
const compress = require('compression'); //compression : 응답 압축 지원 
const bodyParser = require('body-parser'); //body-parser : 요청 데이터의 처리 
const methodOverride = require('method-override'); //method-override : DELETE, PUT 등과 같이 HTTP 동사 지원 기능
const config = require('./config');
const session = require('express-session');

module.exports = function() {
    const app = express();

    // 환경변수에 따라 morgan 을 사용할지, compress를 사용할지 
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process,env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended : false
    }));
    //{ type: 'application/vnd.api+json' }
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session ({
        saveUninitialized : true,
        resave : true,
        secret : config.sessionCode
    }));

    // views 파일이 모여있는 장소를 설정
    app.set('views', './app/views');
    // view temlate 으로 ejs 형식 사용
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    app.use(express.static('./static'));
    return app;
};