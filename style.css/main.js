let now = document.getElementById('now')
let number = document.getElementById('number')
let mounthToday = document.getElementById('mounth')
let Location = document.getElementById('Location')
let Degree = document.getElementById('Degree')
let Temp = document.getElementById('Num-of-Temp')
let TodaycondtionText = document.getElementById('clear-ss')  
let compass = document.getElementById('compass')
let humidity = document.getElementById('humidity')
let wind =document.getElementById('wind')
let TempCondtionImage = document.getElementById('TempCondtionImage')
let searchInput = document.getElementById('search')


let Nextday = Array.from(document.querySelectorAll('.Nextday')) 
let condition = Array.from (document.querySelectorAll('.condtion'))
let greatest = Array.from(document.querySelectorAll('.greatest-temp'))
let samllest = Array.from(document.querySelectorAll('.smallest-temp')) 





async function CrrunetWeather(cityName) {
var response = await fetch  (`https://api.weatherapi.com/v1/forecast.json?key=980aed4bfa4d460e892202857240701&q=${cityName}&days=3`)
var finalResult = await response.json()
return finalResult
}



function displayREsult(data){
let todayDate = new Date ()
now.innerHTML = todayDate.toLocaleDateString('en-us' ,{weekday:'long'})
number.innerHTML = todayDate.getDate()
mounthToday.innerHTML =todayDate.toLocaleDateString('en-us',{month:'long'})
Location.innerHTML = data.location.name
Temp.innerHTML = data.current.temp_c+ "<sup>o</sup>"+ "C"
TempCondtionImage.setAttribute('src',  data.current.condition.icon)
TodaycondtionText.innerHTML = data.current.condition.text
humidity.innerHTML = data.current.humidity +"%"+'<img src="icon-umberella.png" alt=""</img>'
wind.innerHTML = data.current.wind_kph+"km/h"+'<img src="icon-wind.png" alt=""></img>'
compass.innerHTML = data.current.wind_dir+'<img src="icon-compass.png" alt="">'
}


function DisplayNextData(data) {
    let forecastData = data.forecast.forecastday;

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i + 1].date);
        Nextday[i].innerHTML = nextDate.toLocaleDateString('en-us', { weekday: 'long' });
        greatest[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
        samllest[i].innerHTML = forecastData[i + 1].day.mintemp_c;
        condition[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
    }
}


searchInput.addEventListener('input',function () {
startApp(searchInput.value)
})

async function startApp(city="cairo") {
let wheatherData = await CrrunetWeather(city); 
displayREsult(wheatherData)
DisplayNextData(wheatherData)
} 

startApp()