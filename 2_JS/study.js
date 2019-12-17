// clock을 잡아서 innerText를 지정해 줘야함 (queryselect는 바로 밑의 요소밖에 선택하지 못한다)
// (1) clockContainer라는 전체 div를 먼저 잡아준다
const clockContainer = document.querySelector(".js-clock")
// (2) clockContainer div 안에 있는 h1(실제시간)을 잡아준다
const clockTitle = clockContainer.querySelector("h1")

function getTime() {
    // 클래스처럼 쓰는 것, 여기서는 오브젝트로 생각해도 무방
    const date = new Date()
    const min = date.getMinutes()
    const hours = date.getHours()
    const sec = date.getSeconds()
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
}

// 자동으로 실행하는 함수
function init() {
    getTime()
    // 1초마다 자동으로 실행되게 하기 위해 setInterval 함수 사용
    setInterval(getTime, 1000)
}

init()