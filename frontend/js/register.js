import { register, showPassword } from "./funcs/auth.js";

const registerFormBtn = document.querySelector('#register-btn');
const passwordIcon = document.querySelector('#password-icon');
const passwordConfirmIcon = document.querySelector('#password__confirm-icon');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');
registerFormBtn.addEventListener('click', register);


passwordIcon.addEventListener('click', () => {
    showPassword(passwordIcon, passwordInput);
})

passwordConfirmIcon.addEventListener('click', () => {
    showPassword(passwordConfirmIcon, confirmPasswordInput);
})
