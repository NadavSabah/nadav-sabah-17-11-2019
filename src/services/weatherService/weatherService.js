import axios from 'axios'

export default {
  getFiveDayCityWeather,
  getCityData,
  getCurrentWeather,
  getAutoCompleteResult,
  
}
const weatherApi = 'NDicdGE5FFxbjoGAHcb3iODqotL4xOpS'



async function getAutoCompleteResult(userInput) {
  userInput = userInput.toLowerCase()
  let autoResult = []
  if (userInput.length === 0) return autoResult

  try {
    if (localStorage.getItem('_autoComplete_' + userInput) === null) {
      let res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${weatherApi}&q=${userInput}`)
      console.log('AXIOS')
      if (res.data.length) {
        res.data.forEach(suggest => {
          autoResult.push({ id: suggest.Key, cityName: suggest.LocalizedName })
          localStorage.setItem('_autoComplete_' + userInput, JSON.stringify(autoResult))
        })
      }

    } else {
      autoResult = localStorage.getItem('_autoComplete_' + userInput)
      autoResult = JSON.parse(autoResult)

    }
    return autoResult
  } catch (error) {
    console.log('Error is ', error)
    throw error
  }
}

async function getCityData(cityName = 'tel aviv') {
  let cityData = null
  try {
    if (localStorage.getItem(cityName + '_data') === null) {
      console.log('AXIOS')
      let res = await axios.get(`http://dataservice.accuweather.com/locations/v1/search?q=${cityName}&apikey=${weatherApi}`)
      let cityData = res.data[0]
      localStorage.setItem(cityName + '_data', JSON.stringify(cityData))
      return cityData
    }
    else {
      cityData = localStorage.getItem(cityName + '_data')
      cityData = JSON.parse(cityData)

      // console.log('this is the city key from the local storage', cityData)
      return cityData
    }
  } catch (error) {
    console.log('Error in the WeatherService file ', error)
    throw error
  }
}


async function getFiveDayCityWeather(cityKey = '215854') {
  let cityData = null
  try {
    if (localStorage.getItem(cityKey + '_weather') === null) {
      console.log('AXIOS')

      let res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${weatherApi}`)
      cityData = res.data
      localStorage.setItem(cityKey + '_weather', JSON.stringify(cityData))
      return cityData
    }
    else {
      cityData = localStorage.getItem(cityKey + '_weather')
      cityData = JSON.parse(cityData)

      return cityData

    }
  } catch (error) {
    console.log('Error ', error)
    throw error
  }
}
async function getCurrentWeather(cityKey = '215854') {
  let cityData = null
  try {
    if (localStorage.getItem(cityKey + '_currWeather') === null) {
      let res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${weatherApi}`)
      cityData = res.data[0]
      localStorage.setItem(cityKey + '_currWeather', JSON.stringify(cityData))

      return cityData
    }
    else {
      cityData = localStorage.getItem(cityKey + '_currWeather')
      cityData = JSON.parse(cityData)

      return cityData

    }

  } catch (error) {
    throw error
  }
}

