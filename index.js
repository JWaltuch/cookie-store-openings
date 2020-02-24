//express imports
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

app.use('/', async (req, res, next) => {
  try {
    let eateries = await axios.get(
      'https://www.nycgovparks.org/bigapps/DPR_Eateries_001.json?$where=date_extract_y(start_date)>2018'
    )
    eateries = eateries.data
    let sidewalkCafes = await axios.get(
      'https://data.cityofnewyork.us/resource/qcdj-rwhu.json?$where=date_extract_y(issuance_dd)>2018'
    )
    let businesses = await axios.get(
      "https://data.cityofnewyork.us/resource/w7w3-xahh.json?$where=date_extract_y(license_creation_date)>2018 AND business_name like '%25RESTAURANT%25'"
    )
    businesses = businesses.data
    sidewalkCafes = sidewalkCafes.data
    let cookieShops = [...businesses, ...eateries, ...sidewalkCafes]
    res.send(cookieShops)
  } catch (error) {
    console.log(error)
  }
})

app.listen(8080)
