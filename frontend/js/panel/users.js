import {
    getAndShowAllUsers,
    removeUser,
    banUser,
    createNewUser,
} from "./funcs/users.js"

window.removeUser = removeUser;
window.banUser = banUser;
const submitInputBtn = document.querySelector('#submit-input__btn');

window.addEventListener('load', () => {
    getAndShowAllUsers();

    submitInputBtn.addEventListener('click', event => {
        event.preventDefault();
        createNewUser();
    })
})

