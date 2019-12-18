const body = document.querySelector("body")

const IMG_NUMBER = 5

function handleImgLoad() {
    console.log("finished loading")
}

function paintImage(imgNumber) {
    const image = new Image()
    // img와 같은 폴더 내에 있기 때문에 /를 적어줄필요가 없음
    image.src = `img/bg${imgNumber+1}.jpg`
    image.classList.add('bgImage')
    body.prepend(image)
    // API에서 이미지를 가져올 때만 로딩을 한다. 우리는 이미지파일을 가지고 있기 때문에 로딩X
    // image.addEventListener("loadend", handleSubmit)
}

function genRadom() {
    const number = Math.floor(Math.random()*IMG_NUMBER)

    return number
}



function init() {
// 숫자를 불러서 배경을 가져올 것
    const radomNumber = genRadom()
    paintImage(radomNumber)
}

init()