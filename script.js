//Selectors
let busca = document.querySelector('.busca');
let searchInput = document.querySelector('#searchInput');
let resultado = document.querySelector('.resultado');
let titulo = document.querySelector('.titulo');
let tempInfo = document.querySelector('.tempInfo');
let ventoInfo = document.querySelector('.ventoInfo');
let tempImg = document.querySelector('.temp img');
let ventoPonto = document.querySelector('.ventoPonto');
let aviso = document.querySelector('.aviso');

//Listeners
busca.addEventListener('submit', async (event) => {
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
        windAngle: json.wind.deg
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
  resultado.style.display = 'none';
}

function showInfo(json){
  showWarning('');
  
  titulo.innerHTML = `${json.name}, ${json.country}`;
  tempInfo.innerHTML = `${json.temp} <sup>°C</sup>`;
  ventoInfo.innerHTML = `${json.windSpeed} <span>km/h</span>`

  tempImg.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  ventoPonto.style.transform = `rotate(${json.windAngle - 90}deg)`;

  resultado.style.display = 'block';
}

function showWarning(msg) {
  aviso.innerHTML = msg;
  aviso.style.display = 'block';
}