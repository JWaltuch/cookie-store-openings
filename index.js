//express imports
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/', (req, res, next) => {
  res.send('Hello World')
})

app.listen(8080)
