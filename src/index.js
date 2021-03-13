import './css/style.css'
import somecode from './somecode'

const testDiv = document.querySelector('.to-test')
const pTest = document.createElement('p')
pTest.innerText = 'I am working with watch'
testDiv.appendChild(pTest)
testDiv.appendChild(somecode())


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
        getWeatherInfo()
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

function getWeatherInfo() {
    console.log('main temp:', weatherData.main.temp)
    console.log('main feels-like:', weatherData.main.feels_like)
    console.log('main temp-min:', weatherData.main.temp_min)
    console.log('main temp-max:', weatherData.main.temp_max)
    console.log('main pressure:', weatherData.main.pressure)
    console.log('main humidity:', weatherData.main.humidity)
}
//fetchWeatherApi('Madrid')