import {
    getAndShowAllMenus,
    prepareCreateNewMenu,
    createNewMenu,
} from "./funcs/menus.js"

window.addEventListener('load', () => {
    const submitInputBtn = document.querySelector('#submit-input__btn');

    getAndShowAllMenus();
    prepareCreateNewMenu();

    submitInputBtn.addEventListener('click', event => {
        event.preventDefault();
        createNewMenu();
    })
})