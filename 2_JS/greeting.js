const form = document.querySelector(".js-form")
const input = form.querySelector("input")
const greeting = document.querySelector(".js-greetings")

const USER_LOCALSTRORAGE = "currentUser"
const SHOWING_ON = "showing"


function handleSubmit(event) {
    event.preventDefault();
    // input창에 이름을 적고 enter를 눌러도 이름이 사라지지 않음
    // -> 저절로 발생되는 event를 막았기 때문
    const currentValue = input.value
    console.log(currentValue)
}

function askName() {
    form.classList.add(SHOWING_ON)
    // submit event가 발생하면 계속 위로 올라가서 document까지 올라감 (eventDefault)
    form.addEventListener("submit", handleSubmit)
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

}

init()