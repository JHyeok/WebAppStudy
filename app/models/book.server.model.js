const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    created : {
        type : Date,
        default : Date.now
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});

BookSchema.set('toJSON', {getters : true, virtual : true});
mongoose.model('Book', BookSchema);