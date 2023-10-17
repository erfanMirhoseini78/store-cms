import {
    showNameInNavbar,
    renderTopbarMenus,
    getAndShowMenus,
    joinNewsLetters,
} from "./funcs/shared.js";

const footerNewsLetterInputBtn = document.querySelector('.footer-news-letter__input-btn');

window.addEventListener('load', () => {
    showNameInNavbar();
    renderTopbarMenus();
    getAndShowMenus();
})

footerNewsLetterInputBtn.addEventListener('click', event => {
    event.preventDefault();

    joinNewsLetters();
})