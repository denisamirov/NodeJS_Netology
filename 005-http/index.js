//npm run dev city
const http = require('http');
var myAPIkey = require('./config.js').myAPIkey;
const city = process.argv[2];

const url = `http://api.weatherstack.com/current?access_key=${myAPIkey}&query=${city}`;


http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})
