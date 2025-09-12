let companyList = document.getElementById('companyList');
let addBtn = document.querySelector('.add-btn');
let updateBtn = document.querySelector('.update-btn');

// Example of reading the cookies in JavaScript
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
const userId = getCookie('user_id');

console.log(jwtToken);  // Access JWT token
console.log(userId);
const decodedUserId = decodeURIComponent(userId).slice(3, 27);
console.log(decodedUserId);    // Access user ID

// fetch(`/api/company/byuser/${userId}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })

fetch(`/api/company/byuser/${decodedUserId}`, {
    method: 'GET',
    credentials: 'include'  // Important: This ensures the browser sends cookies (including HttpOnly cookies)
})
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        data.forEach(function (i) {
            let companyName = i['name']
            let compId = i['_id'];
            console.log(i);
            const companyDiv = document.createElement('div');
            companyDiv.classList.add('company-option');
            companyDiv.setAttribute('data-company-id', compId);
            companyDiv.innerHTML = `
                  <span>${companyName}</span>
                  <div class="actions-con">
                    <button class="edit-btn" onclick="enterCompany('${compId}')">Enter</button>
                    <button class="edit-btn" onclick="editCompany('${compId}')">Edit</button>
                    <button onclick="deleteCompany('${compId}')">Delete</button>
                  </div>
                `;
            companyList.appendChild(companyDiv);
        })
    })
    .catch(error => console.error('Error:', error));

// Display Create Company Form
function showCreateForm() {
    document.getElementById("createCompanyForm").style.display = "block";
    document.getElementById("createCompanyBtn").style.display = "none";
}

// Create New Company
function createCompany() {

    let companyName = document.getElementById('companyName').value;
    let companyPhone = document.getElementById('companyPhone').value;
    let companyPincode = document.getElementById('companyPincode').value;
    let companyInfo = document.getElementById('companyInfo').value;

    if (companyName && companyPhone && companyPincode && companyInfo) {
        const newCompany = {
            "user_id": decodedUserId,
            "name": companyName,
            "phone": companyPhone,
            "pincode": companyPincode,
            "info": companyInfo
        };

        fetch('/api/company', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newCompany)
        }).then(res => res.json()).then(data => {
            console.log(data);
            window.location.reload()
        })

        // alert(`New company "${companyName}" created successfully!`);
        // Simulate adding company to dropdown list and company list


        // Clear the form and hide it
        document.getElementById('createCompanyForm').style.display = 'none';
        document.getElementById('createCompanyBtn').style.display = 'block';
        document.getElementById('companyName').value = '';
        document.getElementById('companyPhone').value = '';
        document.getElementById('companyPincode').value = '';
        document.getElementById('companyInfo').value = '';
    } else {
        alert("Please fill out all fields.");
    }
}

// Edit Company Functionality (can be extended)
function editCompany(companyId) {

    updateBtn.style.display = 'block'
    addBtn.style.display = 'none'

    let companyName = document.getElementById('companyName').value;
    let companyPhone = document.getElementById('companyPhone').value;
    let companyPincode = document.getElementById('companyPincode').value;
    let companyInfo = document.getElementById('companyInfo').value;

    fetch(`/api/company/${companyId}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => res.json()).then(data => {
        console.log(data);

        document.getElementById('createCompanyForm').style.display = 'block';
        document.getElementById('createCompanyBtn').style.display = 'none';
        document.getElementById('companyid').value = data['_id'];
        document.getElementById('companyName').value = data['name'];
        document.getElementById('companyPhone').value = data['phone'];
        document.getElementById('companyPincode').value = data['pincode'];
        document.getElementById('companyInfo').value = data['info'];

    })


}

updateBtn.addEventListener('click', function (e) {
    let id = e.target.closest('#createCompanyForm').querySelector('#companyid').value
    console.log(id);
    updateCompany(id)
});

function updateCompany(companyId) {

    let companyName = document.getElementById('companyName').value;
    let companyPhone = document.getElementById('companyPhone').value;
    let companyPincode = document.getElementById('companyPincode').value;
    let companyInfo = document.getElementById('companyInfo').value;

    if (companyName && companyPhone && companyPincode && companyInfo) {
        const newCompany = {
            "name": companyName,
            "phone": companyPhone,
            "pincode": companyPincode,
            "info": companyInfo
        };

        fetch(`/api/company/${companyId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newCompany)
        }).then(res => res.json()).then(data => {
            console.log(data);
            window.location.reload()
        })


    } else {
        alert("Please fill out all fields.");
    }

    // alert(`Editing company: ${companyId}`);
    // Implement your edit logic here (e.g., open a form with current details)
}

// Delete Company Functionality
function deleteCompany(companyId) {
    if (confirm(`Are you sure you want to delete ${companyId}?`)) {
        const companyDiv = document.querySelector(`.company-option[data-company-id='${companyId}']`);

        fetch(`/api/company/${companyId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
        }).then(res => res.json()).then(data => {
            console.log(data);
            companyDiv.remove();
            // window.location.reload()
        })


        // alert(`${companyId} has been deleted.`);
    }
}