const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');
const fileMulter = require('../middleware/file')
var dirName = require('../config').dirName;




router.get('/', (req, res) => {
    const listing = {
        "/": "GET:url",
        "/api/books/:id/download": "GET:download",
        "/api/books":"GET:all books",
        "/api/books/:id":"GET:book by id",
        "/api/user/login":"POST: autorization",
        "/api/books/":"POST: load book",
        "/api/books/:id/":"PUT: update book",
        "/api/books/:id//":"DELETE: delete book"
    }
    res.json(listing);
})


router.get('/api/books/:id/download', (req, res) => {
    const {Lib} = library;
    const {id} = req.params;
    const idx = Lib.findIndex(el => el.id === id)

    if (idx !== -1) {
        if (Lib[idx].fileBook !== "") {
            res.sendFile(`${dirName}\\${Lib[idx].fileBook}`)
            console.log("Ok")
            res.status(201);
        } 
        else {  res.json("404 || Not such file")  }
        
        }
     
    else {
            res.status(404);
            res.json("Hey! This book undefined");
        }
        console.log("ok")
    })



//Get all book
router.get('/api/books', (req,res) => {
     const {Lib} = library;
     res.json(Lib)
 })


//Get book by id
router.get('/api/books/:id', (req,res) => {
    const {Lib} = library;
    const {id} = req.params;
    const idx = Lib.findIndex(el => el.id === id)

    if (idx !== -1) {
         res.json(Lib[idx])}

    else {
        res.status(404)
        res.json('Item undefined')
        }
    })


//User autorization
 router.post('/api/user/login', (req,res) => {
     res.status(201)
     res.json({
         id: 1, 
         mail: "test@mail.ru" 
     })
 })


router.post('/api/books', 
    fileMulter.single('cover-book'),
    (req, res) => {
        const {Lib} = library;
        const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
        const newBook = new book(title, description, authors, favorite, fileCover, fileName, fileBook);

        if(req.file){
            const {filename, path} = req.file
            // res.json({path})
        }
        newBook.fileBook = req.file.path;
        newBook.fileName = req.file.filename;
 
        Lib.push(newBook);
        res.status(201);
        res.json(newBook);
    })


//Update book
 router.put('/api/books/:id', 
    fileMulter.single('cover-book'),
    (req,res) => {
        const {Lib} = library;
        const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
        const {id} = req.params;
        const idx = Lib.findIndex(el => el.id === id)

     if (idx !== -1) {
         Lib[idx] = {
             ...Lib[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook 
         }

         Lib[idx].fileBook = req.file.path;
         Lib[idx].fileName = req.file.filename;
        
         res.status(201);
         res.json(Lib[idx]);
     }
    
     else {
         res.status(404);
         res.json("Item undefined");
     }

 })


//Delete book
router.delete('/api/books/:id', (req,res) => {
     const {Lib} = library;
     const {id} = req.params
     const idx = Lib.findIndex(el => el.id === id)

     if (idx !== -1) {
         Lib.splice(idx, 1);
         res.status(201);
         res.json("Ok. Delete completed");
     }
     else {
         res.status(404);
         res.json('Item not found');
     }

 })


module.exports=router;


class book {
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


const library = {
    Lib: [{id: "1",
           title: "Капитанская дочка",
           description: "О бунте Пугачева",
           authors: "А.С.Пушкин",
           fileBook: "public\\book\\1673555180319 - Screenshot_20230111_114125.jpg",
           fileName: "1673555180319 - Screenshot_20230111_114125.jpg"},
           {id: uuid(),
            title: "Harry Potter",
            description: "Wizard book",
            authors: "Rowling J" }]
}



