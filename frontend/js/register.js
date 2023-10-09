import { register } from "./funcs/auth.js";

const registerFormBtn = document.querySelector('#register-btn');
const passwordIcon = document.querySelector('#password-icon');
const passwordConfirmIcon = document.querySelector('#password__confirm-icon');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');
registerFormBtn.addEventListener('click', register);

let isShowPassword = false;

passwordIcon.addEventListener('click', () => {
    showPassword(passwordIcon, passwordInput);
})

passwordConfirmIcon.addEventListener('click', () => {
    showPassword(passwordConfirmIcon, confirmPasswordInput);
})


function showPassword(elem, input) {
    if (!isShowPassword) {
        elem.lastElementChild.remove();
        elem.insertAdjacentHTML('beforeend', `
        <i class="fas fa-eye-slash login-form__password-icon password-icon"></i>
        `)
        isShowPassword = true;
        input.setAttribute('type', 'text');
    } else {
        elem.lastElementChild.remove();
        elem.insertAdjacentHTML('beforeend', `
        <i class="fas fa-eye login-form__password-icon password-icon"></i>
        `)
        isShowPassword = false;
        input.setAttribute('type', 'password');
    }
}