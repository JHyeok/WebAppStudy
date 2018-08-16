const User = require('mongoose').model('User');
const passport = require('passport');

const getErrorMessage = (err) => {
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = '사용자 ID가 이미 있습니다.';
                break;
            default:
            message = '무엇인가 잘못되었습니다.';
        }
    } else {
        for (let errName in err.erros) {
            if(err.erros[errName].message) message = err.erros[errName].message;
        }
    }
    return message;
}

exports.renderLogin = (req, res, next) => {
    if (!req.user) {
        res.render('login', {
            title : '로그인',
            messages : req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSingup = (req, res, next) => {
    if (!req.user) {
        res.render('signup', {
            title : '회원가입',
            messages : req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = (req, res, next) => {
    if (!req.user) {
        const user = new User(req.body);
        let message = null;

        user.provider = 'local';
        user.save((err) => {
            console.log('save');
            if (err) {
                message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, (err) => {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

/*
exports.create = async (req, res) => {
    const user = new User(req.body);

    try {
        let newUser = await user.save();
        res.set('Location', 'http://localhost:3000/users/' + newUser.userid);
        res.status(201).send({respone:'users created for userid : ' + newUser.userid});
    } catch (err) {
        if(err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send(err.message);
        }
        res.status(500).send(err);
    }
};

exports.list = async (req, res) => {
    try  {
        let userlist = await User.find();
        res.json(userlist);
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByuserId = async (req, res, next, id) => {
    try {
        let userInfo = await User.findOne({
            userid : id
        });
        req.user = userInfo;
        next();
    } catch (err) {
        return next(err);
    }
};

exports.update = async (req, res) => {
    try {
        let userUpdate = await User.findByIdAndUpdate(req.user.id, req.body);
        if(!userUpdate) {
            return res.status(404).send('업데이트 오류입니다. (' + req.params.userId + ')');
        } else {
            res.status(200).send(userUpdate);
        }
    } catch (err) {
        if(err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send(err.message);
        }
        res.status(500).send('서버 오류입니다. 업데이트 할 수 없습니다. (' + req.params.userId + ')');
    }
};

exports.delete = async (req, res) => {
    try {
        let userDelete = await User.findByIdAndRemove(req.user.id);
        if(!userDelete) {
            return res.status(404).send('삭제 오류입니다. (' + req.params.userId + ')');
        } else {
            res.status(200).send({respone:'유저(' + req.params.userId + ')가 성공적으로 삭제되었습니다.'});
        }
    } catch (err) {
        if(err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send(err.message);
        }
        res.status(500).send('서버 오류입니다. 삭제 할 수 없습니다. (' + req.params.userId + ')');
    }
};
*/