//init imports
import './css/style.css'

/*****
 * GLOBAL
 * Global Variable. Saves weather data fetched from the API
 * *****/
let weatherData

/*****
 * DOMO QUERYS
 * *****/

//used both in event listener and in class switch function
const btnLocation = document.querySelector('.btn-location')

//used for setting values in browser UI
const divCityName = document.querySelector('.div-city-name')
const divTemperature = document.querySelector('.div-temperature')
const weatherLocation = document.querySelector('.input-location')
const divFeelsLikeTemperature = document.querySelector('.div-feels-like-temp')
const divWeatherDes = document.querySelector('.w-p-description')
const humidityValue = document.querySelector('.w-humidty-value')
const windValue = document.querySelector('.w-wind-value')
const sunriseValue = document.querySelector('.w-sunrise-value')
const sunsetValue = document.querySelector('.w-sunset-value')

//used in class switch function
const divBackground = document.querySelector('.div-background')
const divWeatherDesIcon = document.querySelector('.w-description')
const divWeatherInfoColor = document.querySelector('.div-weather-info')


/*****
 * EVENTS
 * *****/

//When city location is inserted this code is executed
//Calls fetchWeatherApi to update weather data to input city. 
//Switch html classes for css to be able to load corresponding UI based on weather.
//Updates innerHtml's of all weather info
btnLocation.addEventListener('click', async function(event) {
    event.preventDefault()
    if (weatherLocation.value === "") {
        alert('Please inser a city location to search.')
    } else {
        try {
            await fetchWeatherApi(weatherLocation.value)
            weatherLocation.value = ''
            await weatherIdSwitchClass()
            divCityName.innerHTML = weatherData.name
            divTemperature.innerHTML = weatherData.main.temp.toFixed(1) + 'º'
            divFeelsLikeTemperature.innerHTML = weatherData.main.feels_like.toFixed(1) + 'º'
            divWeatherDes.textContent = weatherData.weather[0].description
            humidityValue.innerHTML = weatherData.main.humidity + ' %'
            windValue.innerHTML = weatherData.wind.speed + ' km/h'
            sunriseValue.innerHTML = await sunriseDate(weatherData.sys.sunrise * 1000)
            sunsetValue.innerHTML = await sunsetDate(weatherData.sys.sunset * 1000)       
        } catch (err) {
            console.log('Error catch in btnLocation eventListener:', err)
        }
    }
})

/*****
 * LOGIC CODE
 * *****/

async function sunriseDate(sunriseNumber) {
    const sunrise = new Date(sunriseNumber)
    const sunriseHours = sunrise.getHours()
    const sunriseMinutes = sunrise.getMinutes()
    const sunriseSeconds = sunrise.getSeconds()
    const formatedSunriseDate = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`
    return formatedSunriseDate
}

async function sunsetDate(sunsetNumber) {
    const sunset = new Date(sunsetNumber)
    const sunsetHours = sunset.getHours()
    const sunsetMinutes = sunset.getMinutes()
    const sunsetSeconds = sunset.getSeconds()
    const formatedSunsetDate = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`
    return formatedSunsetDate
}

async function weatherIdSwitchClass() {
    //for weather ID references look here: https://openweathermap.org/weather-conditions
    if (weatherData.weather[0].main === 'Thunderstorm') {
        divBackground.classList = 'div-background storm'
        divWeatherDesIcon.classList = 'big-column w-description i-storm'
        divWeatherInfoColor.classList = 'div-weather-info info-color-storm'
        btnLocation.classList = 'btn-location btn-storm'
    } else if (weatherData.weather[0].main === 'Drizzle') {
        divBackground.classList = 'div-background storm'
        divWeatherDesIcon.classList = 'big-column w-description i-storm'
        divWeatherInfoColor.classList = 'div-weather-info info-color-storm'
        btnLocation.classList = 'btn-location btn-storm'
    } else if (weatherData.weather[0].main === 'Rain') {
        divBackground.classList = 'div-background rain'
        divWeatherDesIcon.classList = 'big-column w-description i-rain'
        divWeatherInfoColor.classList = 'div-weather-info info-color-rain'
        btnLocation.classList = 'btn-location'
    } else if (weatherData.weather[0].main === 'Snow') {
        divBackground.classList = 'div-background snow'
        divWeatherDesIcon.classList = 'big-column w-description i-snow'
        divWeatherInfoColor.classList = 'div-weather-info info-color-snow'
        btnLocation.classList = 'btn-location'
    } else if (weatherData.weather[0].main === 'Clouds') {
        divBackground.classList = 'div-background clouds'
        divWeatherDesIcon.classList = 'big-column w-description i-clouds'
        divWeatherInfoColor.classList = 'div-weather-info info-color-clouds'
        btnLocation.classList = 'btn-location'
    } else if ((weatherData.weather[0].main === 'Clear')) {
        divBackground.classList = 'div-background sunny'
        divWeatherDesIcon.classList = 'big-column w-description i-clear'
        divWeatherInfoColor.classList = 'div-weather-info'
        btnLocation.classList = 'btn-location'
    } else {
        divBackground.classList = 'div-background wind'
        divWeatherDesIcon.classList = 'big-column w-description i-wind'
        divWeatherInfoColor.classList = 'div-weather-info info-color-wind'
        btnLocation.classList = 'btn-location'
    }
}

async function fetchWeatherApi(location) {
    try {
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=607c2ee8da062c5abea21dcd8215c3b7`, {mode: 'cors'})
        weatherData = await weatherResponse.json()
    } catch (err){
        console.log('Error catch in main function fecthWeatherApi:', err)
    }
}

//backup code
/*fetch('http://api.openweathermap.org/data/2.5/weather?q=Aveiro,pt&units=metric&APPID=607c2ee8da062c5abea21dcd8215c3b7', {mode: 'cors'})
.then(function(response) {
    return response.json()
  })
  .then(function(response) {
      console.log(response)
  })
.catch(function(err) {
    console.log('did not fetch')
})*/