// LS에서 내 위치를 가져와서 저장 -> 이를 바탕으로 weather API를 이용해 내 지역 날씨 제공
const API_KEY = '65da36ba8223b74e599ba04f6197a0a4'
const COORDS = 'coords'
const weather = document.querySelector('.js-weather')

function getWeather(lat, lon) {
    // 위에 const WEATHER_API = `~` 하면 lat, lon가 정의되지 않아서 오류남 
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    // 동기비동기 - fecth요청한 date가 완전히 loading 된 후 함수를 호출함
    // 내 지역의 날씨data 출력
    ).then(function(response) {
        // data 로딩을 기다리는 중에는 Promise라고 표시됨 -> 다시 한 번 .then을 써준다
        return response.json()
    }).then(function(json) {
        console.log(json)
        const temp = json.main.temp
        const place = json.name
        weather.innerText = `${temp}°C / ${place}`
    })
}

function saveCoords(coordsObj) {
    // LS에 나의 위치 정보를 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

// Geo 좌표를 가져오는데 실패했을 경우 실행할 함수
function handleGeoError() {
    console.log("Can't access geo location")
}

// Geo 좌표를 가져오는데 성공했을 경우 실행할 함수
function handleGeoSucces(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude,
        longitude
        // 객체의 키와 value가 같을 때는 뒤에 생략할 수 있음
        // latitude: latitude,
        // longitude: longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

// 현재 나의 위치 정보 제공을 물어보는 팝업이 나온다
function askForCoords() {
    // getCurrentPosition(성공시 실행 함수, 실패시 실행 함수)
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    // LS에 아무것도 없으면 
    if(loadedCoords === null) {
        askForCoords()
    } else {
        const parsedCoords = JSON.parse(loadedCoords)
        // 내 위치 표시(위도, 경도)
        console.log(parsedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init() {
    loadCoords()
}

init()
