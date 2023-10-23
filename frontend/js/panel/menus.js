import {
    getAndShowAllMenus,
    prepareCreateNewMenu,
    createNewMenu,
    removeMenu,
} from "./funcs/menus.js"

window.removeMenu = removeMenu;

window.addEventListener('load', () => {
    const submitInputBtn = document.querySelector('#submit-input__btn');

    getAndShowAllMenus();
    prepareCreateNewMenu();

    submitInputBtn.addEventListener('click', event => {
        event.preventDefault();
        createNewMenu();
    })
})