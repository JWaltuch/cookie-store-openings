const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('*', (req, res) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.listen(8080)
