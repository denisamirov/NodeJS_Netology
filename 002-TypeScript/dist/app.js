"use strict";
var BookRepository = /** @class */ (function () {
    function BookRepository(id, title, description, authors, favourite, fileCover, fileName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
    BookRepository.prototype.createBook = function (book) {
        console.log("new boo ".concat(book));
    };
    BookRepository.prototype.getBook = function (id) {
        console.log("get book with id - ".concat(id));
    };
    BookRepository.prototype.getBooks = function () {
        console.log("ok");
    };
    BookRepository.prototype.updateBook = function (id) {
        console.log("update book with id - ".concat(id));
    };
    BookRepository.prototype.deleteBook = function (id) {
        console.log("delete book with id - ".concat(id));
    };
    return BookRepository;
}());
