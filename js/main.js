// تغيير صورة الخلفية 
let imgHead = document.querySelector(".head");
// array of img 
let imgsHeadArray = ["mainPic.png", "mainPic2.png", "mainPic3.png"]
let rightButton = document.querySelector(".icons .right");
let leftButton = document.querySelector(".icons .left");
let spanRandomIndex = document.querySelector('.left-main .randomIndex')
let box1 = document.querySelector('.boxes .box-1')
let box2 = document.querySelector('.boxes .box-2')
let box3 = document.querySelector('.boxes .box-3')
let randomIndex = 0;

function randomizeImages() {
    backgroundInterval = setInterval(() => {
        randomIndex = Math.floor(Math.random() * imgsHeadArray.length)
        imgHead.style.backgroundImage = `url("../img/page1/${imgsHeadArray[randomIndex]}")`
        changScrollColor()
    }, 4000)
}

rightButton.addEventListener('click', function changeBackgroundImage() {
    // Change the background image
    randomIndex += 1
    if (randomIndex < 3) {
        imgHead.style.backgroundImage = `url("../img/page1/${imgsHeadArray[randomIndex]}")`;
        changScrollColor()
    }
}
)
leftButton.addEventListener('click', function changeBackgroundImage() {
    // Change the background image
    randomIndex -= 1
    if (randomIndex > -1) {
        imgHead.style.backgroundImage = `url("../img/page1/${imgsHeadArray[randomIndex]}")`;
        changScrollColor()

    }
}
)
function changScrollColor() {
    document.querySelector('.one').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
    document.querySelector('.two').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
    document.querySelector('.three').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
    spanRandomIndex.textContent = `${randomIndex + 1}`
    if (randomIndex === 0) {
        document.querySelector('.one').style.backgroundColor = '#fff'
    }
    else if (randomIndex === 1) {
        document.querySelector('.one').style.backgroundColor = '#fff'
        document.querySelector('.two').style.backgroundColor = '#fff'

    }
    else {
        document.querySelector('.one').style.backgroundColor = '#fff'
        document.querySelector('.two').style.backgroundColor = '#fff'
        document.querySelector('.three').style.backgroundColor = '#fff'

    }
}
box1.addEventListener('click', function changewidth() {
    box1.style.width = '45%'
    box2.style.width = '26%'
    box3.style.width = '26%'
})
box2.addEventListener('click', function changewidth() {
    box1.style.width = '26%'
    box2.style.width = '45%'
    box3.style.width = '26%'
})
box3.addEventListener('click', function changewidth() {
    box1.style.width = '26%'
    box2.style.width = '26%'
    box3.style.width = '45%'
})
randomizeImages();

pageHomeOpen = true
// ========================================================
// Login Operations 
let firstName = document.querySelector('.popup-box-register .firstName')
let lastName = document.querySelector('.popup-box-register .lastName')
let email = document.querySelector('.popup-box-register .emails')
let password = document.querySelector('.popup-box-register .password')
let checkbox = document.querySelector('.forget input')
let emailLogin = document.querySelector('.popup-box-login .emails')
let passwordLogin = document.querySelector('.popup-box-login .password')