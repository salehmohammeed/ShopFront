//All Variables
let menButton = document.querySelector('.nav .main-nav .men')
let Links = document.querySelectorAll('.nav .main-nav li a')
let navIcons = document.querySelectorAll('.nav .icons a')
let menuMen = document.querySelector('.menThings')
let nav = document.querySelector('.nav')
let navImg = document.querySelector('.nav .logo img')
let navLogoP = document.querySelector('.nav .logo p')
let navLogoSpan = document.querySelector('.nav .logo p span')
let marketIcon = document.querySelector('.nav .icons .market')
let menuMarcket = document.querySelector('.cart')
let nameProduct = document.querySelector('.detail-info .name')?.innerHTML
let price = document.querySelector('.detail-info .salary p .price')?.innerHTML
let size = document.querySelector('.details .size select')
let quantity = document.querySelector('.quantity .amounts p')
let incButtons = document.querySelectorAll('.amount .inc')
let decButtons = document.querySelectorAll('.amount .dec')
//Notification Variabel
let notificationPopupSuccess = document.querySelector('.popup-success-notification')
let notificationPopupFailed = document.querySelector('.popup-failed-notification')
let notificationSuccess = document.querySelector('.popup-success-notification .notif')
let notificationFailed = document.querySelector('.popup-failed-notification .notif')
//Visa Card Variable
let cardNum = document.getElementById("cardNum")
let nameCard = document.getElementById("nameCard")
let securityCard = document.getElementById("securityCard")
let titleInfo = document.querySelector(".personalInfo")
let location2 = document.querySelector(".Location")
let phone = document.querySelector(".phone")
// Popup Variable
let popupOverlayCheckout = document.querySelector('.popup-overlay-checkout')
let popupBoxCheckout = document.querySelector('.popup-box-checkout')
// End Variable
let open = false // for open menu or close
let BuyerName; // For Notification Welcome
let menuOpen; // For closeCart function
let loginDone = false; // For Guard
let total = 0 // For The Checkout Popup
let couunt = 0 // Number of produce in checkout  popup
let openVissa = false  // Open Or Close Visa Div
let openJawwwal = false // Open Or Close Jawwal Div
let products; // Array Of Product
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
} else {
    products = [];
}
let userList = []; // User List Array
localStorage.userList = JSON.stringify([{ firstName: "Saleh", lastName: "Mas3ood", email: "Saleh@gmail.com", password: "saleh123" }]);
if (localStorage.userList != null) {
    userList = JSON.parse(localStorage.userList);
} else {
    userList = [];
}
// OPEN MENU IN PUBLIC
function openMenu(menuOPen, buttonClick) {
    open = !open
    if (open) {
        buttonClick.classList.add('clicked')
        menuOPen.style.opacity = 1
        nav.classList.add('white')
        navImg.src = 'img/page1/blackLogo.svg'
        navLogoP.classList.add('black')
        navLogoSpan.style.color = '#FBB03B'
        menuOPen.style.zIndex = '999';
        Links.forEach(a => {
            a.classList.add('black')
        })
        navIcons.forEach(a => {
            a.classList.add('black')
        })
        menuOpen = menuOPen
    } else {
        buttonClick.classList.remove('clicked')
        menuOPen.style.opacity = 0
        nav.classList.remove('white')
        navLogoP.classList.remove('black')
        menuOPen.style.zIndex = '0';
        Links.forEach(a => {
            a.classList.remove('black')
        })
        navIcons.forEach(a => {
            a.classList.remove('black')
        })
        if (pageHomeOpen) {
            navImg.src = 'img/page1/logo.svg'
            navLogoSpan.style.color = '#fff'
        } else {
            navImg.src = 'img/page1/blackLogo.svg'
            navLogoSpan.style.color = '#FBB03B'
        }
    }
}
// Open Men Things Menu
menButton.addEventListener('click', function openMenuSpecail() {

    openMenu(menuMen, menButton)
})
// Open Market Menu
marketIcon.addEventListener('click', function openMenuSpecail() {
    openMenu(menuMarcket, marketIcon)
})

//Show Product In Table
function showProduct() {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        table += `
            <tr>
            <td class='img'><img src="${products[i].img}"><p>${products[i].name}</p></td>
            <td>${products[i].color}</td> 
            <td>${products[i].size}</td>
            <td><div class='amount'><span class="dec" id='${i}'>-</span > <p class="row-${i}">${products[i].ammount}</p><span class="inc" id='${i}'>+</span></div></td>
            <td><span class='price-${i}'>${products[i].price}</span> $</td>
            <td class='totalPriceProduct-${i}'>${Math.round(products[i].ammount * products[i].price)} $</td>
            <td><button onclick="deleteProduct(${i})" id="delete" class="deleteButton"><i class="fas fa-trash"></i></button></td>
            </tr>
        `

    }
    document.getElementById("tbody").innerHTML = table;
}

// Delete Product
function deleteProduct(i) {
    products.splice(i, 1)
    localStorage.products = JSON.stringify(products);
    showProduct();
    getTotalPrice()
    checkoutButton()
}
// Increase and Decrease Amount
// Increase Operation In Table
incButtons.forEach(incButton => {
    console.log(incButton)
    incButton.addEventListener('click', () => {
        let rowIndex = incButton.id
        let amount = document.querySelector(`.amount .row-${rowIndex}`)
        let amountInNumber = Number(amount.innerHTML)
        amount.textContent = amountInNumber + 1
        products[rowIndex].ammount = amountInNumber + 1
        let totalPriceProduct = document.querySelector(`.totalPriceProduct-${rowIndex}`)
        let price = document.querySelector(`.price-${rowIndex}`).innerHTML
        console.log(price)
        console.log(products[rowIndex].ammount)
        totalPriceProduct.innerHTML = `${Math.round(price * products[rowIndex].ammount)} $`
        console.log(totalPriceProduct.innerHTML)
        localStorage.products = JSON.stringify(products)
        getTotalPrice()
        countPices()
    })
})
// Dcrease Operation In Table
decButtons.forEach(decButton => {
    decButton.addEventListener('click', () => {
        let rowIndex = decButton.id
        let amount = document.querySelector(`.amount .row-${rowIndex}`)
        if (amount.innerHTML <= 1) {
            amount.textContent = 1
        } else {
            amount.textContent = amount.innerHTML - 1
            products[rowIndex].ammount = amount.innerHTML
            let totalPriceProduct = document.querySelector(`.totalPriceProduct-${rowIndex}`)
            let price = document.querySelector(`.price-${rowIndex}`).innerHTML
            totalPriceProduct.innerHTML = `${Math.round(price * products[rowIndex].ammount)} $`
        }
        localStorage.products = JSON.stringify(products)
        getTotalPrice()
        countPices()
    })
})
// GET TOTAL PRICE For All Product In Curd
function getTotalPrice() {
    total = 0;
    let totalSpan = document.querySelector('.totalCoast span')
    products.forEach(product => {
        total += product.price * product.ammount
    })
    totalSpan.textContent = Math.round(total)
    console.log(total)
}
// Get Total Price For The Row Of Curd
function getTotalPriceForProduct() {
    let total = 0
    let totalSpan = document.querySelector('.totalCoast span')

    totalSpan.textContent = Math.round(total)
}
//CLOSE CART Stand By Variabe menuOpen
function closeCart() {
    menuOpen.style.opacity = 0
    nav.classList.remove('white')
    navImg.src = 'img/page1/logo.svg'
    navLogoP.classList.remove('black')
    navLogoSpan.style.color = '#fff'
    menuOpen.style.zIndex = '0';
    Links.forEach(a => {
        a.classList.remove('black')
    })
    navIcons.forEach(a => {
        a.classList.remove('black')
    })
}
// Close Login Popup
function closeLogin() {
    document.querySelector('.login').classList.remove('clicked')
    document.querySelector(`.popup-overlay-login`).style.display = 'none';
    document.querySelector(`.popup-box-login`).style.display = 'none';
}
// Open Login Popup
function openLoginPopup() {
    document.querySelector('.login').classList.add('clicked')
    document.querySelector(`.popup-overlay-login`).style.display = 'block';
    document.querySelector(`.popup-box-login`).style.display = 'block';
}
// Close Register Popup
function closeRegister() {
    document.querySelector(`.popup-overlay-register`).style.display = 'none';
    document.querySelector(`.popup-box-register`).style.display = 'none';
    openLoginPopup()
}
// Open Register Popup
function openRegister() {
    closeLogin()
    document.querySelector(`.popup-overlay-register`).style.display = 'block';
    document.querySelector(`.popup-box-register`).style.display = 'block';
}
// Close Forget Popup
function closeForget() {
    document.querySelector(`.popup-overlay-forget`).style.display = 'none';
    document.querySelector(`.popup-box-forget`).style.display = 'none';
}
// Open Forget Popup
function openForget() {
    closeLogin()
    document.querySelector(`.popup-overlay-forget`).style.display = 'block';
    document.querySelector(`.popup-box-forget`).style.display = 'block';
}
// Open Search Popup
function openSearch() {
    document.querySelector('.search').classList.add('clicked')
    document.querySelector(`.popup-overlay-search`).style.display = 'block';
    document.querySelector(`.popup-box-search`).style.display = 'block';
}
// Close Search Popup
function closeSearch() {
    document.querySelector('.search').classList.remove('clicked')
    document.querySelector(`.popup-overlay-search`).style.display = 'none';
    document.querySelector(`.popup-box-search`).style.display = 'none';
}

//==============================================================
//Make Notification
// Success Notification
function getNotificationSuccess(Message) {
    notificationSuccess.innerHTML = Message
    notificationPopupSuccess.style.display = 'block'
    setTimeout(() => {
        notificationPopupSuccess.style.display = 'none'
    }, 4000)
}
// Failed Notification
function getNotificationFailed(Message) {
    notificationFailed.innerHTML = Message
    notificationPopupFailed.style.display = 'block'
    setTimeout(() => {
        notificationPopupFailed.style.display = 'none'
    }, 4000)
}
// =============================================================
// Login Operations 
//REGISTER
function register() {
    if (firstName.value && lastName.value && email.value && password.value) {
        let newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            psassword: password.value,
        }
        userList.push(newUser)
        localStorage.userList = JSON.stringify(userList);
        clearFormRegister();
        closeRegister()
        getNotificationSuccess('Register Done')
    } else {
        getNotificationFailed(`Register Failed <hr style='background:white;'> <i class="fas fa-exclamation-circle"></i> All Field Required`)
    }
}
// Login 
function login() {
    userList.forEach(user => {
        if (user.email === emailLogin.value && user.password === passwordLogin.value) {
            loginDone = true;
            BuyerName = `${user.firstName} ${user.lastName}`
            closeLogin()
            clearLoginForm()
            getNotificationSuccess(`Login Done <hr style='background:white;'><i class="fas fa-check-circle"></i> Welcome ${user.firstName} ${user.lastName}`)
        } else {
            getNotificationFailed('Email Or Password Error ')
        }
    })
}
//Clear Form Register
function clearFormRegister() {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
}
// Clear Form Login
function clearLoginForm() {
    emailLogin.value = '';
    passwordLogin.value = '';
}
// Appear Or Hide Checkout Button In Curd
function checkoutButton() {
    if (products.length === 0) {
        let checkoutButtons = document.querySelectorAll('.checkout')
        checkoutButtons.forEach(checkoutButton => {
            checkoutButton.style.display = 'none'
        })
    } else {
        let checkoutButtons = document.querySelectorAll('.checkout')
        console.log(checkoutButtons)
        checkoutButtons.forEach(checkoutButton => {
            checkoutButton.style.display = 'block'
        })
    }
}
// Count The Number Of Pices In Checkout Popup
function countPices() {
    couunt = 0
    products.forEach((product) => {
        couunt += Number(product.ammount);
    })
    console.log(couunt)
}
// Make Checkout
function checkout() {
    if (loginDone) {
        let currentDate = new Date()
        const year = currentDate.getFullYear(); // Note: Months are zero-based (0 = January, 11 = December)
        const month = currentDate.getMonth(); // Note: Months are zero-based (0 = January, 11 = December)
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        let date = document.querySelector(".date")
        date.innerHTML = `<span>${day}-${month}-${year}</span>  <span>${hours}:${minutes}:${seconds}</span>`
        console.log(month)
        let BuyerNameSpan = document.querySelector('.BuyerName .name')
        BuyerNameSpan.innerHTML = BuyerName
        popupBoxCheckout.style.display = 'block'
        popupOverlayCheckout.style.display = 'block'
        document.querySelector('.countPices .pices').innerHTML = couunt;
        document.querySelector('.TotalPrice .prices').innerHTML = Math.round(total);
    } else {
        getNotificationFailed('Login First')
        openLoginPopup();
    }
}
// Close Chekout Popup
function closeCheckout() {
    popupBoxCheckout.style.display = 'none'
    popupOverlayCheckout.style.display = 'none'
}
// Open Jawwal Div
function openJawwal() {
    openJawwwal = !openJawwwal
    if (openJawwwal) {
        document.querySelector('.jawwal i').classList.add('fa-chevron-down')
        document.querySelector('.jawwalPay').style.display = 'block'
    } else {
        document.querySelector('.jawwal i').classList.remove('fa-chevron-down')
        document.querySelector('.jawwalPay').style.display = 'none'
    }
}
//Open Visa Div
function openVisa() {
    openVissa = !openVissa
    if (openVissa) {
        document.querySelector('.Visa-Form').style.display = 'block'
        document.querySelector('.visa i').classList.add('fa-chevron-down')
    } else {
        document.querySelector('.Visa-Form').style.display = 'none'
        document.querySelector('.visa i').classList.remove('fa-chevron-down')
    }
}
//Get Info In Visa Div To Apper The Input
function getInfo() {
    console.log('getInfo')
    if (cardNum.value != "" && nameCard.value != "" && securityCard.value != "") {
        titleInfo.style.display = "block"
        location2.style.display = "block"
        phone.style.display = "block"
    }
    else {
        titleInfo.style.display = "none"
        location2.style.display = "none"
        phone.style.display = "none"
    }
}
//Finish All Buy Operation
function payNow() {
    if (cardNum.value != "" && nameCard.value != "" && securityCard.value != "" && location2.value != "" && phone != '') {
        closeCheckout()
        closeCart()
        document.querySelector(`.popup-overlay-complete`).style.display = 'block';
        document.querySelector(`.popup-box-complete`).style.display = 'block';
        setTimeout(() => {
            document.querySelector(`.popup-overlay-complete`).style.display = 'none';
            document.querySelector(`.popup-box-complete`).style.display = 'none';
            products.splice(0)
            localStorage.products = JSON.stringify(products);
            location.reload();
        }, 4000);
        scroll({
            top: 0,
            behavior: "smooth"
        })
    } else {
        getNotificationFailed('All Inputs Required')
    }
}




showProduct();
getTotalPrice();
countPices();
checkoutButton();