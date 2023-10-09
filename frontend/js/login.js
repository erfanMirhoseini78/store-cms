import { showPassword, login } from "./funcs/auth.js";

const passwordIcon = document.querySelector('#password-icon');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login__btn');

passwordIcon.addEventListener('click', () => {

    showPassword(passwordIcon, passwordInput);
})

loginBtn.addEventListener('click', login);
