import { showSwal, saveIntoLocalStorage } from "./utility.js";

const nameInput = document.querySelector('#name');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');

const register = event => {
    event.preventDefault();

    let newUser = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: confirmPasswordInput.value.trim()
    }

    fetch('http://localhost:4000/v1/auth/register', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
        .then(res => {
            console.log(res);

            if (res.status === 201) {
                showSwal('success',
                    'ثبت نام با موفقیت انجام شد',
                    'ورود به پنل',
                    result => {
                        console.log(result);
                        clearInput();
                        location.href = 'index.html';
                    })
                return res.json();
            }
            else if (res.status > 300) {
                showSwal('error',
                    'اطلاعات را به درستی وارد کنید',
                    'تصحیح اطلاعات',
                    result => {
                        console.log(result);
                    })
            }
        })
        .then(result => {
            console.log("Result: ", result);

            saveIntoLocalStorage('user', { token: result.accessToken })
        })
    // .catch(err => console.log("Error: ", err))
}

function clearInput() {
    nameInput.value = "";
    usernameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
}

export { register }