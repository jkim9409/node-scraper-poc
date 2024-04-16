const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log("/ called")
  res.send('Hello World!')
})

app.get('/scrapings', (req, res) => {
    console.log("/scrapings called")
    res.send('scraping')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})