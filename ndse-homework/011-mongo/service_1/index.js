const express = require('express');
const { appendFile } = require('fs');
const err404 = require("./middleware/err-404");
const logger = require("./middleware/logger");
const routera = require("./routes/routes");
const routerapi = require("./routes/api");
const mongoose = require('mongoose');



const app = express();  //Initialization app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded());  //Use urlcoded for parse forms
app.set("view engine", "ejs");  //Use ejs for view

app.use(logger);        //Work without this row
app.use("/", routera);   //Data in json
app.use("/api/", routerapi);   //Data in json
app.use(err404);        //Error


async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT)
        console.log(PORT)
        }
    catch(e) {
        console.log(e)
    }
}

mongoose.set("strictQuery", false);
const UrlDB = "mongodb://mongodb:27017/books";
const PORT = 3000;
start(PORT, UrlDB)

//Изменить на "mongodb://localhost:27017/text";


