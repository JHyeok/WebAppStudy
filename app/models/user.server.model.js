const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

// todo : 유저 생성 시 required 리턴 필요
const UserSchema = new Schema({
    username : String,
    userid : {
        type : String,
        unique : true,
        required : 'Username이 필요합니다.',
        trim : true
    },
    password : {
        type : String,
        validate:[
            function(password) {
                return password.length >= 8;
            },
            'Password 는 8자 이상이어야 합니다.'
        ]
    },
    salt : {
        type : String,
    },
    provider : {
        type : String,
        required : 'Provider가 필요합니다.'
    },
    providerId : String,
    providerData : {},
    email : {
        type : String,
        match : [/.+\@.+\..+/, "유효한 전자메일 주소를 기입하십시오."]
    },
    created : {
        type : Date,
        default : Date.now
    },
    role : {
        type : String,
        enum:['Admin', 'SuperUser', 'User', 'Guest']
    }
});

UserSchema.virtual('idname').get(function() {
    return this.userid + '' + this.username;
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = crypto.randomBytes(16).toString('base64')
    this.password = this.hashpassword(this.password);
    }
    next();
});

UserSchema.methods = {
    hashpassword : function (password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha256').toString('base64');
    },
    authenticate : function (password) {
        return this.password === this.hashpassword(password);
    }
};

UserSchema.statics.findUniqueUserid = function (userid, suffix, callback) {
    let _this = this;
    let possibleUserid = userid + (suffix || '');
    
    _this.findOne({
        userid : possibleUserid
    }, (err,user) => {
        if (!err) {
            if(!user) {
                callback(possibleUserid);
            } else {
                return _this.findUniqueUserid(userid, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {getters : true, virtual : true});
mongoose.model('User', UserSchema);
