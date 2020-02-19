//express imports
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

app.use('/', async (req, res, next) => {
  try {
    let {data} = await axios.get(
      'https://www.nycgovparks.org/bigapps/DPR_Eateries_001.json'
    )
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

app.listen(8080)
