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

    const {Lib} = library;
    res.render("index", {
        title: "Книжки",
        gallery: Lib,
    })
})




router.get('/:id/download', (req, res) => {
    const {Lib} = library;
    const {id} = req.params;
    const idx = Lib.findIndex(el => el.id === id)

    if (idx !== -1) {
        if (Lib[idx].fileBook !== "") {
            res.download(`${dirName}\\${Lib[idx].fileBook}`);
        } 
        else { res.redirect("/404"); 
        console.log("ok f")
         } 
        }
     
    else {
        res.redirect("/404"); 
        onsole.log("ok s")
        }
   
    })





//Get all book
router.get('/book', (req,res) => {
    const {Lib} = library;
    res.render("books/index", {
        title: "Моя библиотека",
        gallery: Lib,
    })
 })


//Get book by id
router.get('/book/:id', (req,res) => {
    const {Lib} = library;
    const {id} = req.params;
    const idx = Lib.findIndex(el => el.id === id)

    if (idx !== -1) {
        
         res.render("books/view", {
            title: "Книга | описание",
            Lib: Lib[idx],
        });}

    else {
        res.redirect("/404"); 
        }
    })



router.get('/create', (req, res) => {
    const {Lib} = library;
    res.render("books/create", {
        title: "Книга | Добавление",
        Lib: {},
    })
});


router.post('/create', fileMulter.single('fileBook'), (req, res) => {
    const {Lib} = library;
        const {title, description, authors, favourite, fileCover, fileName, fileBook} = req.body;
        const newBook = new book(title, description, authors, favourite, fileCover, fileName, fileBook);

        if(req.file){
            const {filename, path} = req.file
            newBook.fileBook = req.file.path;
            newBook.fileName = req.file.filename;
        }
        

        Lib.push(newBook);

    res.redirect('/')
});



//Update.get
router.get('/update/:id', 
    (req,res) => {
        const {Lib} = library;
        const {title, description, authors, favourite, fileCover, fileName, fileBook} = req.body;
        const {id} = req.params;
        const idx = Lib.findIndex(el => el.id === id)

     if (idx !== -1) {
        res.render("books/update", {
            title: "Книга | редактирование",
            lib: Lib[idx],
        });    
    }

    else {
        throw new Error('Something broke! ')}



});

//Update book
 router.post('/update/:id', 
    fileMulter.single('fileBook'),
    (req,res) => {
        const {Lib} = library;
        const {title, description, authors, favourite, fileCover, fileName, fileBook} = req.body;
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

         res.redirect('/book');

            }

        else {
            res.redirect('/404');
        } 

    
     
})


//Delete book
router.post('/book/delete/:id', (req,res) => {
     const {Lib} = library;
     const {id} = req.params
     const idx = Lib.findIndex(el => el.id === id)

     if (idx !== -1) {
        Lib.splice(idx, 1);
         res.redirect("/book")
     }
     else {
         res.redirect("/404")
     }
 })




module.exports=router;