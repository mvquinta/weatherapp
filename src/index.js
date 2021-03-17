import './css/style.css'
//if I want to import an image by js, that I will! I need to import them first
//see this guide https://webpack.js.org/guides/asset-management/#loading-images

let weatherData

const divBackground = document.querySelector('.div-background')
const btnLocation = document.querySelector('.btn-location')
const weatherLocation = document.querySelector('.input-location')
const divCityName = document.querySelector('.div-city-name')
const divTemperature = document.querySelector('.div-temperature')
const divFeelsLikeTemperature = document.querySelector('.div-feels-like-temp')
const divWeatherDes = document.querySelector('.w-p-description')
const divWeatherDesIcon = document.querySelector('.w-description')
const humidityValue = document.querySelector('.w-humidty-value')
const windValue = document.querySelector('.w-wind-value')
const sunriseValue = document.querySelector('.w-sunrise-value')
const sunsetValue = document.querySelector('.w-sunset-value')
const divWeatherInfoColor = document.querySelector('.div-weather-info')


btnLocation.addEventListener('click', async function(event) {
    event.preventDefault()
    if (weatherLocation.value === "") {
        alert('Please inser a city location to search.')
    } else {
        try {
            await fetchWeatherApi(weatherLocation.value)
            weatherLocation.value = ''
            await weatherId()
            divCityName.innerHTML = weatherData.name
            divTemperature.innerHTML = weatherData.main.temp.toFixed(1) + 'º'
            console.log(weatherData.main.temp.toFixed(1) + 'º')
            divFeelsLikeTemperature.innerHTML = weatherData.main.feels_like.toFixed(1) + 'º'
            divWeatherDes.textContent = weatherData.weather[0].description
            humidityValue.innerHTML = weatherData.main.humidity + ' %'
            windValue.innerHTML = weatherData.wind.speed + ' km/h'
            
            const sunrise = new Date(weatherData.sys.sunrise * 1000)
            const sunriseHours = sunrise.getHours()
            const sunriseMinutes = sunrise.getMinutes()
            const sunriseSeconds = sunrise.getSeconds()
            sunriseValue.innerHTML = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`
    
            const sunset = new Date(weatherData.sys.sunset * 1000)
            const sunsetHours = sunset.getHours()
            const sunsetMinutes = sunset.getMinutes()
            const sunsetSeconds = sunset.getSeconds()
            sunsetValue.innerHTML = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`        
        } catch (err) {
            console.log('Error catch in btnLocation eventListener:', err)
        }
    }
})

async function weatherId() {
    //for weather ID references look here: https://openweathermap.org/weather-conditions
    if (weatherData.weather[0].main === 'Thunderstorm') {
        divBackground.classList = 'div-background storm'
        divWeatherDesIcon.classList = 'big-column w-description i-storm'
        divWeatherInfoColor.classList = 'div-weather-info info-color-storm'
    } else if (weatherData.weather[0].main === 'Drizzle') {
        divBackground.classList = 'div-background storm'
        divWeatherDesIcon.classList = 'big-column w-description i-storm'
        divWeatherInfoColor.classList = 'div-weather-info info-color-storm'
    } else if (weatherData.weather[0].main === 'Rain') {
        divBackground.classList = 'div-background rain'
        divWeatherDesIcon.classList = 'big-column w-description i-rain'
        divWeatherInfoColor.classList = 'div-weather-info info-color-rain'
    } else if (weatherData.weather[0].main === 'Snow') {
        divBackground.classList = 'div-background snow'
        divWeatherDesIcon.classList = 'big-column w-description i-snow'
        divWeatherInfoColor.classList = 'div-weather-info info-color-snow'
    } else if (weatherData.weather[0].main === 'Clouds') {
        divBackground.classList = 'div-background clouds'
        divWeatherDesIcon.classList = 'big-column w-description i-clouds'
        divWeatherInfoColor.classList = 'div-weather-info info-color-clouds'
    } else if ((weatherData.weather[0].main === 'Clear')) {
        divBackground.classList = 'div-background sunny'
        divWeatherDesIcon.classList = 'big-column w-description i-clear'
        divWeatherInfoColor.classList = 'div-weather-info'
    } else {
        divBackground.classList = 'div-background wind'
        divWeatherDesIcon.classList = 'big-column w-description i-wind'
        divWeatherInfoColor.classList = 'div-weather-info info-color-wind'
    }
}

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

async function fetchWeatherApi(location) {
    try {
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=607c2ee8da062c5abea21dcd8215c3b7`, {mode: 'cors'})
        weatherData = await weatherResponse.json()
        //console.log('console dentro da function', weatherData)
    } catch (err){
        console.log('Error catch in main function fecthWeatherApi:', err)
    }
}

function setWeatherInfo() {
    console.log('main temperatue:', weatherData.main.temp)
    console.log('main feels-like:', weatherData.main.feels_like)
    console.log('main temp-min:', weatherData.main.temp_min)
    console.log('main temp-max:', weatherData.main.temp_max)
    //console.log('main pressure:', weatherData.main.pressure)
    console.log('main humidity:', weatherData.main.humidity)
    console.log('weather main: ', weatherData.weather[0].main)
    console.log('weather description: ', weatherData.weather[0].description)
    console.log(typeof weatherData.weather[0].description)
    //console.log('wind main:', weatherData.wind)
    console.log('wind speed:', weatherData.wind.speed)
    console.log('wind deg:', weatherData.wind.deg)
    //console.log('clouds:', weatherData.clouds)
    console.log('cloudiness:', weatherData.clouds.all,'%')
    console.log('country', weatherData.sys.country)
    //console.log('timezone', weatherData.timezone)
    console.log('city name', weatherData.name)
    console.log('Coord longitude', weatherData.coord.lon)
    console.log('Coord latitude', weatherData.coord.lat)

    //console.log('sunrise', weatherData.sys.sunrise)
    //console.log('sunset', weatherData.sys.sunset)
    const sunrise = new Date(weatherData.sys.sunrise * 1000)
    const sunriseHours = sunrise.getHours()
    const sunriseMinutes = sunrise.getMinutes()
    const sunriseSeconds = sunrise.getSeconds()
    console.log(`Sunrise is at-> ${sunriseHours}:${sunriseMinutes}:${sunriseSeconds} `)

    const sunset = new Date(weatherData.sys.sunset * 1000)
    const sunsetHours = sunset.getHours()
    const sunsetMinutes = sunset.getMinutes()
    const sunsetSeconds = sunset.getSeconds()
    console.log(`Sunset is at-> ${sunsetHours}:${sunsetMinutes}:${sunsetSeconds} `)

}
//fetchWeatherApi('Madrid')