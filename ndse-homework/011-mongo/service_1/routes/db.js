var library = require("../config").library;

//Экспорт функции в routes.js в /book:id
module.exports = function db(bookID) {
 
  const http = require('http');
  const url = `http://counter:4000/counter/${bookID}`;

  //Get запрос на получение счетчика
  http.get(url, (res) => {
      let rowData = ''
      res.on('data', (chunk) => rowData += chunk)
      res.on('end', () => {
          let parseData = JSON.parse(rowData);
          const {Lib} = library;
          Lib[bookID].views = parseData.cnt                      
        })
      

  }).on('error', (err) => {
      console.error(err)
  })

}

