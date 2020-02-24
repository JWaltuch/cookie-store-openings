//express imports
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

const convertYDMDateToMap = date => {
  let dateMap = {}
  dateMap.year = +date.slice(0, 4)
  dateMap.month = +date.slice(5, 7)
  dateMap.day = +date.slice(8)
  return dateMap
}

const convertMDYDateToMap = date => {
  let dateMap = {}
  dateMap.month = +date.slice(0, 2)
  dateMap.day = +date.slice(3, 5)
  dateMap.year = +date.slice(6)
  return dateMap
}

app.use('/', async (req, res, next) => {
  try {
    let eateries = await axios.get(
      'https://www.nycgovparks.org/bigapps/DPR_Eateries_001.json'
    )
    eateries = eateries.data
    let sidewalkCafes = await axios.get(
      'https://data.cityofnewyork.us/api/views/qcdj-rwhu/rows.json'
    )
    let businesses = await axios.get(
      "https://data.cityofnewyork.us/resource/w7w3-xahh.json?$where=date_extract_y(license_creation_date)>2018 AND business_name like '%25RESTAURANT%25'"
    )
    businesses = businesses.data

    sidewalkCafes = sidewalkCafes.data.data
    eateries = eateries.filter(eatery => {
      if (eatery.start_date) {
        let dateMap = convertYDMDateToMap(eatery.start_date)
        let currentDate = new Date()
        return (
          dateMap.year === currentDate.getFullYear() ||
          dateMap.year === currentDate.getFullYear() - 1
        )
      } else {
        return false
      }
    })
    sidewalkCafes = sidewalkCafes.filter(cafe => {
      if (cafe[cafe.length - 1]) {
        let dateMap = convertYDMDateToMap(cafe[cafe.length - 1])
        let currentDate = new Date()
        return (
          dateMap.year === currentDate.getFullYear() ||
          dateMap.year === currentDate.getFullYear() - 1
        )
      } else {
        return false
      }
    })
    let cookieShops = [...businesses, ...eateries, ...sidewalkCafes]
    res.send(cookieShops)
  } catch (error) {
    console.log(error)
  }
})

app.listen(8080)
