import {
    getAndShowSessions,
    editSession,
    removeSession,
    prepareCreateNewSesion,
    createSession,
} from "./funcs/sessions.js";

window.editSession = editSession;
window.removeSession = removeSession;

const submitInputBtn = document.querySelector('#submit-input__btn');

window.addEventListener('load', () => {
    getAndShowSessions();
    prepareCreateNewSesion();
})

submitInputBtn.addEventListener('click', event => {
    event.preventDefault();

    console.log('Clicked');

    createSession();
})