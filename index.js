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
    let eateryNames = data.filter(eatery => {
      if (eatery.start_date) {
        return eatery.start_date[3] === '2'
      } else {
        return false
      }
    })
    eateryNames = eateryNames.map(eatery => eatery.name)
    //eateryNames = eateryNames.filter(eatery => eatery.start_date[3] === '2')
    res.send(eateryNames)
  } catch (error) {
    console.log(error)
  }
})

app.listen(8080)
