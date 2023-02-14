const express = require('express');
const { appendFile } = require('fs');
const err404 = require("./middleware/err-404");
const logger = require("./middleware/logger");
const routera = require("./routes/routes");
const routerapi = require("./routes/api");



const app = express();  //Initialization app

// app.use(express.urlencoded());  //Use urlcoded for parse forms
app.set("view engine", "ejs");  //Use ejs for view

app.use(logger);        //Work without this row
app.use("/", routera);   //Data in json
app.use("/api/", routerapi);   //Data in json
app.use(err404);        //Error



const PORT = 3000;
app.listen(PORT)


