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
const humidityValue = document.querySelector('.w-humidty-value')
const windValue = document.querySelector('.w-wind-value')
const sunriseValue = document.querySelector('.w-sunrise-value')
const sunsetValue = document.querySelector('.w-sunset-value')


btnLocation.addEventListener('click', async function(event) {
    event.preventDefault()
    console.log('before try or catch')
    try {
        console.log('entered try but failed')
        await fetchWeatherApi(weatherLocation.value)
        weatherLocation.value = ''
        await weatherId()
        divCityName.innerHTML = weatherData.name
        divTemperature.innerHTML = weatherData.main.temp
        divFeelsLikeTemperature.innerHTML = weatherData.main.feels_like
        divWeatherDes.textContent = weatherData.weather[0].description
        humidityValue.innerHTML = weatherData.main.humidity
        windValue.innerHTML = weatherData.wind.speed
        
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
})

async function weatherId() {
    //for weather ID references look here: https://openweathermap.org/weather-conditions
    console.log('id here', weatherData.id)
    console.log('weather main: ', weatherData.weather[0].main)
    console.log('id hersdafse', weatherData.weather[0].id)
    if (weatherData.weather[0].id >= 200 && weatherData.weather[0].id <= 299) {
        console.log('storm')
        divBackground.classList = 'main-content storm'
    } else if (weatherData.weather[0].id >= 300 && weatherData.weather[0].id <= 399) {
        console.log('drizzle')
        divBackground.classList = 'main-content storm'
    } else if (weatherData.weather[0].id >= 500 && weatherData.weather[0].id <= 599) {
        console.log('Rain')
        divBackground.classList = 'main-content rain'
    } else if (weatherData.weather[0].id >= 600 && weatherData.weather[0].id <= 699) {
        console.log('Snow')
        divBackground.classList = 'main-content snow'
    } else if (weatherData.weather[0].id >= 700 && weatherData.weather[0].id <= 799) {
        console.log('Atmosgphere. Other wel.. guess cloud')
        divBackground.classList = 'main-content wind'
    } else if (weatherData.weather[0].id >= 801 && weatherData.weather[0].id <= 899) {
        console.log('clouds')
        divBackground.classList = 'main-content clouds'
    } else {
        console.log('clear and sunny')
        divBackground.classList = 'main-content sunny'
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