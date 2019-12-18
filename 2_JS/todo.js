const toDoForm = document.querySelector(".js-toDoForm")
// const input을 하게되면 study.js의 const input과 이름이 겹쳐서 충돌한다
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = 'toDos'
// 할일 목록을 여러개일수도 있기 때문에 array로 만든다
// toDos는 목록이 계속 삭제되고 추가될 수 있기 때문에 const가 아니라 let으로 만들어준다
let toDos = []

function deleteToDo(event) {
    // delete (1) 내가 클릭한 버튼이 속한 parent(li) 번호를 알아야한다
    // console.dir(event.target.parentNode)
    const btn = event.target
    const li = btn.parentNode
    toDoList.removeChild(li)
    // delete (2) 새로고침해도 지워진 toDos가 남아있도록 설정해줘야한다
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id)
    })
    console.log(cleanToDos)
    console.log(toDos)
    // 바뀐 toDos(cleanToDos)로 toDos를 바꿔준다
    toDos = cleanToDos
    saveToDos()
}

// localStorage에 todoList가 남을 수 있도록 저장해줌
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
    // 이렇게만 저장하면 [object Object]라고 저장됨 (why? : LS에서는 JS의 data를 저장할 수 없다. only string만 저장가능)
    // JSON.stringify명령어 써서 JSON 형태 -> string으로 바꿔서 저장한다
}

function paintToDo(text) {
    // (1) 빈 li만들기
    const li = document.createElement("li")
    // (2) delBtn과 span(li에 들어갈 내용) 만들기
    const delBtn = document.createElement("button")
    const span = document.createElement("span")
    const newId = toDos.length + 1
    // (3) span의 내용으로 input받은 text넣어주기
    span.innerText = text
    delBtn.innerText = "❌"
    delBtn.addEventListener("click", deleteToDo)
    // (4) span + delBtn을 li로 넣어주기 (하나의 li로 묶는다)
    // .appendChild -> 부모 element 밑에 자식 element를 넣는것
    li.appendChild(span)
    li.appendChild(delBtn)
    li.id = newId
    // (5) toDoList에 li를 넣어주기
    toDoList.appendChild(li)

    const toDoObj = {
        text: text,
        // 아무것도 없을 때에는 id = 1 -> 새로 항목을 만들면 1번 아이디로 들어가게 된다
        id: newId
    };
    // toDos에 toDoObject를 넣어준다
    toDos.push(toDoObj)
    // 저장 -> 저장할 때, toDos에 있는 string만 저장할 수 있도록해줘야함
    saveToDos()
}

function loadToDos() {
    const loadedTodos = localStorage.getItem(TODOS_LS)
    if (loadedTodos !== null) {
        console.log(loadedTodos)
        // [{"text":"study JS","id":1},{"text":"solving task","id":2}] 이런 형태로 불러와지지만 이것 자체가 str이다
        const parsedToDos = JSON.parse(loadedTodos)
        // forEach() = Array안에 있는 것들을 각각 한번씩 함수를 실행시켜주는 것
        // array를 돌면서 각각의 toDo를 출력해주는 함수에 넣는다
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
            console.log(toDo.text)
        })
    }
}

function handleSubmit(event) {
    event.preventDefault()
    const currentValue = toDoInput.value
    paintToDo(currentValue)
    toDoInput.value = ""
}

function init() {
    loadToDos()
    toDoForm.addEventListener("submit", handleSubmit)
}

init()
