const fs = require('fs');   //Enable lib for work with file system
const os = require('os');   //Enable lib for work with operation system


module.exports = (req, res, next) => {
    
    const now = Date.now(); //Get actual date
    const {url, method} = req;  //Get URL and method from REQUEST

    const data = `Time: ${now} - URL: ${url} - CRUD: ${method}`;    //Item for log
    fs.appendFile("server.log", data + os.EOL, (err) => {
        if (err) throw err;
    })  //os.EOL for new row

    next() //give manage for function
}



