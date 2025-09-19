import { register, login } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameSpan = document.getElementById('username');
    const userInfoDiv = document.querySelector('.user-info');
    const authContainer = document.querySelector('.auth-container');

    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    const showLoggedIn = (username) => {
        userInfoDiv.style.display = 'block';
        authContainer.style.display = 'none';
        usernameSpan.textContent = username;
    };

    const showLoggedOut = () => {
        userInfoDiv.style.display = 'none';
        authContainer.style.display = 'flex';
        usernameSpan.textContent = '';
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    if (token && username) {
        showLoggedIn(username);
    } else {
        showLoggedOut();
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        const data = await register(username, password);
        alert(data.message);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const data = await login(username, password);

        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', username);
            showLoggedIn(username);
        } else {
            alert(data.error);
        }
    });

    logoutBtn.addEventListener('click', () => {
        showLoggedOut();
    });
});
