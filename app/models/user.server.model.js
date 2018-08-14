const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    userid : {
        type : String,
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
    email : {
        type : String,
        mmatch : /.+\@.+@..+/
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

UserSchema.set('toJSON', {getters : true, virtual : true});
mongoose.model('User', UserSchema);