import { showSwal, saveIntoLocalStorage, getToken } from "./utility.js";

const register = event => {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    const usernameInput = document.querySelector('#username');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirmPassword');

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
                        clearInputRegister();
                        location.href = 'index.html';
                    })
                return res.json();
            }
            else if (res.status === 400 || res.status === 401) {
                showSwal('error',
                    'اطلاعات را به درستی وارد کنید',
                    'تصحیح اطلاعات',
                    () => { }
                )
            }
        })
        .then(result => {
            console.log("Result: ", result);

            saveIntoLocalStorage('user', { token: result.accessToken })
        })
    // .catch(err => console.log("Error: ", err))

    function clearInputRegister() {
        nameInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
    }
}

const login = event => {
    event.preventDefault();

    const identifierInput = document.querySelector('#identifier');
    const passwordInput = document.querySelector('#password');

    let userInfos = {
        identifier: identifierInput.value.trim(),
        password: passwordInput.value.trim(),
    }

    fetch('http://localhost:4000/v1/auth/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userInfos)
    })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                showSwal('success',
                    'با موفقیت وارد شدید',
                    'ورود به پنل',
                    result => {
                        console.log(result);
                        clearInputLogin();
                        location.href = 'index.html';
                    })
                return res.json();
            }
            else if (res.status === 400 || res.status === 401) {
                showSwal('error',
                    'کاربری با این اطلاعات یافت نشد!',
                    'تصحیح اطلاعات',
                    () => { }
                )
            }
        })
        .then(result => {
            console.log("Result: ", result);

            saveIntoLocalStorage('user', { token: result.accessToken })
        })

    function clearInputLogin() {
        identifierInput.value = "";
        passwordInput.value = "";
    }
}

const showPassword = (elem, input) => {
    let isShowPassword = false;
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

const getMe = async () => {
    let token = getToken();

    if (!token) {
        return false;
    }

    const res = await fetch('http://localhost:4000/v1/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await res.json();

    return data;
}

export { register, showPassword, login, getMe }