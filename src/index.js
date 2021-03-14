import './css/style.css'
//if I want to import an image by js, that I will! I need to import them first
//see this guide https://webpack.js.org/guides/asset-management/#loading-images

let weatherData

const btnLocation = document.querySelector('.btnLocation')
const weatherLocation = document.querySelector('.weather-location')
const tempDiv = document.querySelector('.temp-div-to-print')

btnLocation.addEventListener('click', async function(event) {
    event.preventDefault()
    try {
        await fetchWeatherApi(weatherLocation.value)
        weatherLocation.value = ''
        //console.log('City name', typeof weatherData.name)
        tempDiv.innerHTML = weatherData.name
        setWeatherInfo()
    } catch (err) {
        console.log('Error catch in btnLocation eventListener:', err)
    }


})


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