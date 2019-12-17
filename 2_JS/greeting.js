const form = document.querySelector(".js-form")
const input = form.querySelector("input")
const greeting = document.querySelector(".js-greetings")

const USER_LOCALSTRORAGE = "currentUser"
const SHOWING_ON = "showing"

// localstorage에 text를 저장한다
function saveName(text) {
    localStorage.setItem(USER_LOCALSTRORAGE, text)
}

function handleSubmit(event) {
    event.preventDefault();
    // input창에 이름을 적고 enter를 눌러도 이름이 사라지지 않음
    // -> 저절로 발생되는 event를 막았기 때문
    const currentValue = input.value
    console.log(currentValue)
    paintGreeting(currentValue)
    saveName(currentValue)
}

function askName() {
    form.classList.add(SHOWING_ON)
    form.addEventListener("submit", handleSubmit)
    // submit event가 발생하면 계속 위로 올라가서 document까지 올라감 (eventDefault)
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON)
    greeting.classList.add(SHOWING_ON)
    greeting.innerText = `Hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LOCALSTRORAGE)
    if (currentUser === null) {
        askName()
    } else {
        paintGreeting(currentUser)
    }
}

function init() {
    loadName()
}

init()