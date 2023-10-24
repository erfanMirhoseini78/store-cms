import {
    getAndShowAllUsers,
    removeUser,
    banUser,
    createNewUser,
} from "./funcs/users.js"

window.removeUser = removeUser;
window.banUser = banUser;

window.addEventListener('load', () => {
    getAndShowAllUsers();

    const submitInputBtn = document.querySelector('#submit-input__btn');

    submitInputBtn.addEventListener('click', event => {
        event.preventDefault();
        createNewUser();
    })
})

