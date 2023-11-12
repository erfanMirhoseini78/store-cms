import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const getAndShowAllUsers = async () => {
    const userToken = getToken();
    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch('http://localhost:4000/v1/users', {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    })
    const users = await res.json();

    tableBodyWrapper.innerHTML = "";
    users.forEach((user, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
        <tr>
            <td>
                ${index + 1}
            </td>
            <td>
                ${user.name}
            </td>
            <td>
                ${user.username}
            </td>
            <td>
                ${user.email}
            </td>
            <td>
                ${user.phone}
            </td>
            <td>
                ${user.role === 'ADMIN' ? "مدیر" : "کاربر"}
            </td>
            <td>
                <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger delete-btn' onclick=removeUser(${JSON.stringify(user._id)})>حذف</button>
            </td>
            <td>
                <button type='button' class='btn btn-info delete-btn' onclick=banUser(${JSON.stringify(user._id)})>بن</button>
            </td>
        </tr>`)
    })

    return users;
}

const removeUser = async userID => {
    let userToken = getToken();

    showSwal(
        'question',
        'آیا از حذف کاربر اطمینان دارید ؟',
        'اره',
        async result => {
            if (result.value) {
                const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                })

                const user = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'کاربر با موفقیت حذف شد',
                        'ایولاااا',
                        () => {
                            getAndShowAllUsers();
                        }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'متاسفانه کاربر حذف نشد!!!',
                        'عیب نداره',
                        () => { }
                    )
                }

                return user;
            }
        }
    )
}

const banUser = async userID => {
    let adminToken = getToken();

    showSwal(
        'question',
        'آیا از بن کردن کاربر اطمینان دارید ؟',
        'اره',
        async result => {
            if (result.value) {
                const res = await fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    }
                })

                const user = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'کاربر با موفقیت بن شد',
                        'ایولاااا',
                        () => { }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'متاسفانه کاربر بن نشد!!!',
                        'عیب نداره',
                        () => { }
                    )
                }

                return user;
            }
        }
    )
}

const createNewUser = () => {

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
            if (res.status === 201) {
                showSwal('success',
                    'کاربر جدید با موفقیت ایجاد شد',
                    'خیلی هم عالی',
                    () => {
                        clearInputRegister();
                        getAndShowAllUsers();
                    })
            }
            else if (res.status === 400 || res.status === 401) {
                showSwal(
                    'error',
                    'اطلاعات را به درستی وارد کنید',
                    'تصحیح اطلاعات',
                    () => { }
                )
            }
            else if (res.status === 403) {
                showSwal(
                    'error',
                    'کاربر با این شماره تماس بن شده است',
                    'متاسفم!!!',
                    () => { }
                )
            }

            return res.json();
        })

    function clearInputRegister() {
        nameInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
    }
}
export {
    getAndShowAllUsers,
    removeUser,
    banUser,
    createNewUser,
}