//Selectors
let searchForm = document.querySelector('#search-form');
let searchInput = document.querySelector('#search-input');
let result = document.querySelector('#result');
let title = document.querySelector('#title');
let tempInfo = document.querySelector('#tempInfo');
let windInfo = document.querySelector('.information.wind .informationInfo');
let humidityInfo = document.querySelector('.information.humidity .informationInfo');
let pressureInfo = document.querySelector('.information.pressure .informationInfo');
let tempImg = document.querySelector('#result-first--content img');
let warning = document.querySelector('#warning');
let fullDate = document.querySelector('#full-date');
let dayWeek = document.querySelector('#day-week');
let hour = document.querySelector('#hour');

//Listeners
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = searchInput.value;
  
  if(input !== ''){
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=2d3fd52fecc48ef2f0227f1bddce33a9&units=metric&lang=pt_br`;  

    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200){
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
        pressure: json.main.pressure
      })
    } else {
      clearInfo();
      showWarning('Não encontramos esta localização.');
    }
  } else clearInfo();
})

//Functions
function clearInfo(){
  showWarning('');
  result.style.display = 'none';
}

function showInfo(json){
  showWarning('');
  
  title.innerHTML = `${json.name}, ${json.country}`;
  tempInfo.innerHTML = `${parseInt(json.temp)} <sup>°C</sup>`;
  windInfo.innerHTML = `${json.windSpeed} <span>km/h</span> |`
  humidityInfo.innerHTML = `${json.humidity} <span>%</span> |`
  pressureInfo.innerHTML = `${json.pressure} <span>hPa</span>`

  tempImg.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  
  showHour();

  result.style.display = 'block';
}

function showWarning(msg) {
  warning.innerHTML = msg;
  warning.style.display = 'block';
}

function showHour() {
  let date = new Date();
  fullDate.innerHTML = date.toLocaleDateString();
  dayWeek.innerHTML = getDayWeek(date.getDay());
  hour.innerHTML = addZero(date.getHours()) + ':' + addZero(date.getMinutes());
}

function getDayWeek(day) {
  let dayWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ]
 
  return dayWeek[day];
}

function addZero(number) {
  return number < 10 ? '0' + number : number;
}