const express = require('express')
const { appendFile } = require('fs')
const {v4: uuid} = require('uuid')


class book {
    constructor(title="", description="", authors="", favourite="", fileCover="", fileName="", id=uuid()) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
}}


const library = {
    Lib: [{id: "1",
           title: "Капитанская дочка",
           description: "О бунте Пугачева",
           authors: "А.С.Пушкин" },
           {id: uuid(),
            title: "Harry Potter",
            description: "Wizard book",
            authors: "Rowling J" }]
}

const app = express()   //Initialization app
app.use(express.json()) //Data in json


//Route
//Get all book
app.get('/api/books', (req,res) => {
    const {Lib} = library;
    res.json(Lib)
})


//Get book by id
app.get('/api/books/:id', (req,res) => {
    const {Lib} = library;
    const {id} = req.params;
    const idx = Lib.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(Lib[idx])}

    else {
        res.status(404)
        res.json('Item undefined')
        }
    }
)


//User autorization
app.post('/api/user/login', (req,res) => {
    res.status(201)
    res.json({
        id: 1, 
        mail: "test@mail.ru" 
    })
})


//Create book
app.post('/api/books', (req,res) => {
    const {Lib} = library;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = new book(title, description, authors, favorite, fileCover, fileName);
    Lib.push(newBook);
    res.status(201);
    res.json(newBook);

})


//Update book
app.put('/api/books/:id', (req,res) => {
    const {Lib} = library;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
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
           fileName 
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
app.delete('/api/books/:id', (req,res) => {
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



const PORT = 3000;
app.listen(PORT)