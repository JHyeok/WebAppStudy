const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

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
    website : {
        type : String,
        get : function(url) {
            if(!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
    
                return url;
            }
        }
    },
    role : {
        type : String,
        enum:['Admin', 'SuperUser', 'User', 'Guest']
    }
});

UserSchema.virtual('idname').get(function() {
    return this.userid + '' + this.username;
});

UserSchema.pre('save', (next) => {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),
    'base64');
    this.password = this.hashpassword(this.password);
    }
    next();
});

UserSchema.methods.hashpassword = (password) => {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = (password) => {
    return this.password === this.hashpassword(passwrod);
};

UserSchema.statics.findUniqueUserid = (userid, suffix, callback) => {
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