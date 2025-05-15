let img = document.querySelector('.form .img img')
let colorList = document.querySelectorAll('.detailGet .color ul li')
imgArrayColor = ['']

// Show Data Add And Delete
function shirt(src) {
    img.src = src
}
function setImage(id) {
    colorList.forEach(color => {
        color.classList.remove("active")
    })
    document.getElementById(`${id}`).classList.add("active")
    img.src = `../img/page2/${id}.png`
}

let p = document.querySelector('.quantity .amounts p')

function changeAmount(Name) {
    let ammountNumber = p.innerHTML
    if (Name === 'increase') {
        ammountNumber = Number(ammountNumber)
        ammountNumber++;
        p.textContent = ammountNumber
    } else {
        if (ammountNumber <= 1) {
            p.textContent = 1
        } else {
            ammountNumber = ammountNumber - 1;
            p.textContent = ammountNumber
        }
    }
}

function clearForm() {
    colorList.forEach(color => {
        color.classList.remove("active")
    })
    document.getElementById('white').classList.add('active')
    size.value = 'Choose Size'
    quantity.innerHTML = '1'
    img.src = '../img/page2/white.png'
}

let description = document.querySelector('.description .buttons .desc')
let reviwes = document.querySelector('.description .buttons .reviwes')
let descriptionPage = document.querySelector('.descriptionPage')
let reviewsPage = document.querySelector('.reviewsPage')

function openDescr() {
    description.classList.add('active')
    reviwes.classList.remove('active')
    descriptionPage.style.display = 'block'
    reviewsPage.style.display = 'none'
}
function openReviwes() {
    reviwes.classList.add('active')
    description.classList.remove('active')
    descriptionPage.style.display = 'none'
    reviewsPage.style.display = 'block'
}


pageHomeOpen = false

let submit = document.querySelector('.detailGet .submit')
// ADD DATA 
submit.onclick = function () {
    let colorChoose;
    colorList.forEach(color => {
        if (color.classList.contains('active')) {
            colorChoose = color.id
        }
    })
    let newData = {
        img: img.src,
        name: nameProduct,
        color: colorChoose,
        size: size.value,
        ammount: quantity.innerHTML,
        price: price
    }
    products.push(newData)
    console.log(products)
    localStorage.setItem("products", JSON.stringify(products));
    getNotificationSuccess('Add Product Done')
    showProduct();
    getTotalPrice()
    clearForm()
    checkoutButton()
}

// ==============================================
// Login Operations
let firstName = document.querySelector('.popup-box-register .page2 .firstName')
let lastName = document.querySelector('.popup-box-register .page2 .lastName')
let email = document.querySelector('.popup-box-register .page2 .emails')
let password = document.querySelector('.popup-box-register .page2 .password')
let checkbox = document.querySelector('.forget input')
let emailLogin = document.querySelector('.popup-box-login .emails')
let passwordLogin = document.querySelector('.popup-box-login .password')