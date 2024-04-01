const {v4: uuid} = require('uuid');

module.exports = {
    dirName: __dirname,
    library: {
      Lib: [{id: "1",
             title: "Капитанская дочка",
             description: "О бунте Пугачева",
             authors: "А.С.Пушкин",
             fileBook: "",
             fileName: "",
             favourite: true},
             {id: uuid(),
              title: "Harry Potter",
              description: "Wizard book",
              authors: "Rowling J",
              fileBook: "",
              fileName: "", }]
  },
  book: class book {
    constructor(title="", description="", authors="", favourite="", fileCover="", fileName="", fileBook="", id=uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
}}
  };






  