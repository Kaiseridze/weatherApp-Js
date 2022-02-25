let currentCity = document.querySelector('.title');
let weather = document.querySelector('.weather');

const mainBlock = document.querySelector('.main_block_inner');
const changeCity = document.querySelector('#input');
const API_KEY = '58669da6ed0e5a6c0dc04774da1f7937'
const days = ['Sunday', 'Monday', 'Chewzday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let date = new Date()
let day = date.getDay()

changeCity.addEventListener('keydown', (e) =>{
   if(e.keyCode === 13 && changeCity.value != 0){
      currentCity.innerHTML = changeCity.value
      changeCity.value = ''
      requestApi(currentCity.innerHTML)
   }
   if(e.key.match(/[0-9]/)) return e.preventDefault()
})



function requestApi(city){
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
   .then( function (resp) {return resp.json()})
   .then( function (data){
      console.log(data) 

      currentName = data.name
      currentCity.innerHTML = `<h1 class="title">${currentName ? currentName : 'Nothing found'}</h1>`
      currentWeather = data.main.temp
      currentDescription = data.weather[0].description
      currentIcon = data.weather[0].icon
      weather.innerHTML = `
      <p class="weather_day">Today is: ${days[day]}</p>
      <img src="http://openweathermap.org/img/w/${currentIcon}.png"/>
      <p>${currentDescription}</p>
      <h2 class="weather_temperature">${Math.floor(currentWeather - 273)} &deg;C | ${Math.floor(1.8 * (currentWeather - 273) + 32)}&deg;F</h2>`
   })
   .catch(function () {

   })
}

const showDate = () => {
   weather.innerHTML = `
   <p class="weather_day">Today is: ${days[day]}</p>`
}
showDate()

mainBlock.appendChild(weather)