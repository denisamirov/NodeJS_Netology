const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');
const fileMulter = require('../middleware/file')
var dirName = require('../config').dirName;
var library = require("../config").library;
var book = require("../config").book;




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


router.get('/books/:id/download', (req, res) => {
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
router.get('/books', (req,res) => {
     const {Lib} = library;
     res.json(Lib)
 })


//Get book by id
router.get('/books/:id', (req,res) => {
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
 router.post('/user/login', (req,res) => {
     res.status(201)
     res.json({
         id: 1, 
         mail: "test@mail.ru" 
     })
 })


router.post('/books', 
    fileMulter.single('fileBook'),
    (req, res) => {
        const {Lib} = library;
        const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
        const newBook = new book(title, description, authors, favorite, fileCover, fileName, fileBook);

        if(req.file){
            const {filename, path} = req.file
            newBook.fileBook = req.file.path;
            newBook.fileName = req.file.filename;
        }
 
        Lib.push(newBook);
        res.status(201);
        res.json(newBook);
    })


//Update book
 router.put('/books/:id', 
    fileMulter.single('fileBook'),
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
               favourite,
               fileCover
            }
   
            if(req.file){
               Lib[idx].fileBook = req.file.path;
               Lib[idx].fileName = req.file.filename;
            }
        
         res.status(201);
         res.json(Lib[idx]);
     }
    
     else {
         res.status(404);
         res.json("Item undefined");
     }

 })


//Delete book
router.delete('/books/:id', (req,res) => {
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



