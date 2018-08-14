const books = require('../../app/controllers/books.server.controller');

module.exports = function(app) {
    app.route('/books')
    .post(books.create)
    .get(books.list);

    // app.route('/books/:bookId')
    // .get(books.read)
    // .put(books.update)
    // .delete(books.delete);

    // app.param('bookId', books.bookById);
};
