import './css/style.css'
import somecode from './somecode'

const testDiv = document.querySelector('.to-test')
const pTest = document.createElement('p')
pTest.innerText = 'I am working with watch'
testDiv.appendChild(pTest)
testDiv.appendChild(somecode())