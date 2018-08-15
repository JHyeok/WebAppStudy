const User = require('mongoose').model('User');

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