// Set your API base URL (adjust this if needed)
const apiBaseUrl = 'http://localhost:3000'; // Change to your actual API URL

// Create User
document.getElementById('createUserBtn').addEventListener('click', async () => {
    const name = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const phone = document.getElementById('createPhone').value;
    const password = document.getElementById('createPassword').value;

    const user = { name, email, phone, password };

    try {
        const response = await fetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        document.getElementById('responseMessage').textContent = `User created: ${data.name}`;
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error creating user';
    }
});

// Fetch all users
document.getElementById('fetchUsersBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`/api/users`);
        const users = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear current list

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `<strong>${user.name}</strong> | ${user.email} | ${user.phone}`;
            userList.appendChild(userItem);
        });
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error fetching users';
    }
});

// Update User
document.getElementById('updateUserBtn').addEventListener('click', async () => {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const phone = document.getElementById('updatePhone').value;
    const password = document.getElementById('updatePassword').value;

    const updatedUser = { name, email, phone, password };

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
        const data = await response.json();
        document.getElementById('responseMessage').textContent = `User updated: ${data.name}`;
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error updating user';
    }
});

// Delete User
document.getElementById('deleteUserBtn').addEventListener('click', async () => {
    const id = document.getElementById('deleteId').value;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        document.getElementById('responseMessage').textContent = data.messphone;
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error deleting user';
    }
});
