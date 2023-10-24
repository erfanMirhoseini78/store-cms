import {
    getAndShowAllUsers,
    removeUser,
} from "./funcs/users.js"

window.removeUser = removeUser;

window.addEventListener('load', () => {
    getAndShowAllUsers();
})