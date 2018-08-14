const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    },
    created : {
        type : Date,
        default : Date.now
    },
    author:{
        type:Schema.ObjectId,
        ref:'User'
    }
});

PostSchema.set('toJSON', {getters : true, virtual : true});
mongoose.model('Post', PostSchema);