const Book = require('mongoose').model('Book');
// const User = require('mongoose').model('User');

exports.create = function(req, res, next) {
    const book = new Book(req.body);
    // const user = new User();
    // book.author = user;
    book.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(book);
        }
    });
};

exports.list = function(req, res, next) {
    //book.find.populate('author').exec(function(err, books)
    Book.find(function(err, books) {
        if (err) {
            return next(err);
        } else {
            res.json(books);
        }
    });
};