//express imports
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

const convertDateToMap = startDate => {
  let dateMap = {}
  dateMap.year = +startDate.slice(0, 4)
  dateMap.month = +startDate.slice(5, 7)
  dateMap.day = +startDate.slice(8)
  return dateMap
}

app.use('/', async (req, res, next) => {
  try {
    let {data} = await axios.get(
      'https://www.nycgovparks.org/bigapps/DPR_Eateries_001.json'
    )
    let eateryNames = data.filter(eatery => {
      if (eatery.start_date) {
        let dateMap = convertDateToMap(eatery.start_date)
        let currentDate = new Date()
        return (
          dateMap.year === currentDate.getFullYear() ||
          dateMap.year === currentDate.getFullYear() - 1
        )
      } else {
        return false
      }
    })
    //eateryNames = eateryNames.map(eatery => eatery.name)
    res.send(eateryNames)
  } catch (error) {
    console.log(error)
  }
})

app.listen(8080)
