// Toggle sections
const homeTab = document.getElementById('homeTab');
const profileTab = document.getElementById('profileTab');
const productsTab = document.getElementById('productsTab');
const ordersTab = document.getElementById('ordersTab');
const reportsTab = document.getElementById('reportsTab');

const homeSection = document.querySelector('.home-section');
const profileSection = document.querySelector('.profile-section');
const productsSection = document.querySelector('.products-section');
const ordersSection = document.querySelector('.orders-section');
const reportsSection = document.querySelector('.reports-section');

setActiveSection(homeSection)

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}

// Get JWT and user_id from cookies
const jwtToken = getCookie('jwt');
const userId2 = getCookie('user_id');

console.log(jwtToken);  // Access JWT token
console.log(userId2);
const decodedUserId2 = decodeURIComponent(userId2).slice(3, 27);
console.log(decodedUserId2);

profileTab.addEventListener('click', () => {
    setActiveSection(profileSection);

    fetch(`/api/users/${decodedUserId2}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => res.json()).then(data => {
        // console.log("User: ", data);
        document.getElementById('userName').value = data.name
        document.getElementById('userEmail').value = data.email
        document.getElementById('userPhone').value = data.phone
    })


    // fetch('/api/company', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify(newCompany)
    // }).then(res => res.json()).then(data => {
    //     console.log(data);
    //     window.location.reload()
    // })

});

homeTab.addEventListener('click', () => {
    setActiveSection(homeSection);
});
productsTab.addEventListener('click', () => {
    setActiveSection(productsSection);
});

ordersTab.addEventListener('click', () => {
    setActiveSection(ordersSection);
});

reportsTab.addEventListener('click', () => {
    setActiveSection(reportsSection);
});

function setActiveSection(activeSection) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show the clicked section
    activeSection.classList.add('active');
}

function loadCompany(companyId) {

    // fetch(`/api/company/byuser/${companyId}`, {
    //     credentials: "include",

    // }).then(res => res.json()).then(data => {
    //     console.log(data);
    // })

    fetch(`/api/company/${companyId}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => res.json()).then(data => {
        console.log("Company: ", data);
        document.title = data['name']
        document.querySelector('.comp-heading h3').innerText = data['name']
        // window.location.reload()
    })
}


function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}

// Get JWT and user_id from cookies
const comp_id = getCookie('comp_id');
const userId = getCookie('user_id');

// console.log(userId);
const decodedUserId = decodeURIComponent(userId).slice(3, 27);
// console.log(decodedUserId); 

console.log(comp_id);

loadCompany(comp_id)
