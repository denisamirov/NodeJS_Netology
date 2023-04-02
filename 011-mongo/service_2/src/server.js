const express = require('express')
const redis = require('redis')

const app = express();
const PORT = process.env.PORT || 3002;

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';
const client = redis.createClient({url: REDIS_URL});

(async () => {
    await client.connect()
  })();

app.get('/counter/:bookID', async (req, res) => {
    const {bookID} = req.params;
    try {
        const cnt = await client.get(bookID)
        res.json({cnt})
      } catch(e) {
        res.json({errcode: 500, ermsg: 'redis err!'});
      }
    });
    
    
app.post('/counter/:bookID/incr', async (req, res) => {
    const {bookID} = req.params;
    try {
        const cnt = await client.incr(bookID)
        res.json({cnt})
      } catch(e) {
        res.json({errcode: 500, ermsg: 'redis err!'});
      }
})



app.listen(PORT, () => {
    console.log(`Слушаю порт ${PORT}`)
  })