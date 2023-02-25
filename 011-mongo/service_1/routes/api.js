const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');
const fileMulter = require('../middleware/file')
var dirName = require('../config').dirName;
var library = require("../config").library;
var book = require("../config").book;
const bookModels = require("../models/bookModel")



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
router.get('/books', async (req, res) => {
    try {
        const bookFromMongo = await bookModels.find().select("-__v")
        res.json(bookFromMongo)
    } catch(e) {
        res.status(500).json()
    }
});

//Get book by id
router.get('/books/:id', async (req,res) => {
    const {id} = req.params
    try {
        const bookFromMongo = await bookModels.findById(id).select("-__v")
        res.json(bookFromMongo)
    } catch(e) {
        res.status(500).json()
    }
    });


//User autorization
 router.post('/user/login', (req,res) => {
     res.status(201)
     res.json({
         id: 1, 
         mail: "test@mail.ru" 
     })
 })


router.post('/books', 
    fileMulter.single('fileBook'), async (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

        if (req.file){
            var newBook = new bookModels({
                title, 
                description, 
                authors, 
                favorite, 
                fileCover, 
                fileName: req.file.filename, 
                fileBook: req.file.path
            });
        } else {
            var newBook = new bookModels({
                title, 
                description, 
                authors, 
                favorite, 
                fileCover, 
                fileName,
                fileBook
            });

        }

        try {
            await newBook.save()
            res.json(newBook)
        } catch(e) {
            res.status(500).json()
            console.log(e)
        }
 
    })


//Update book
 router.put('/books/:id', 
    fileMulter.single('fileBook'), async (req,res) => {
        const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
        const {id} = req.params;

        try {

            if(req.file) {
                await bookModels.findByIdAndUpdate(id, 
                {title,
                description,
                authors,
                favorite,
                fileCover,
                fileName: req.file.path,
                fileBook: req.file.filename})}
            else {
                await bookModels.findByIdAndUpdate(id, 
                    {title,
                    description,
                    authors,
                    favorite,
                    fileCover})}
            res.redirect(`/api/books/${id}`)
            } 
        catch(e) {
            res.status(500).json(e)
            }
})


//Delete book
router.delete('api/books/:id', async (req,res) => {
     const {id} = req.params
     try {
        await bookModels.deleteOne({_id: id})
        res.json(id)
     } catch(e) {
        res.status(500).json(e)
     }

 })


module.exports=router;



