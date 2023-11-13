import {
    getAndShowArticles,
    removeArticle,
    createNewArticle,
    prepareCreateNewArticles,
} from "./funcs/articles.js";

window.removeArticle = removeArticle;

const submitInputBtn = document.querySelector('#submit-input__btn');

window.addEventListener('load', () => {
    prepareCreateNewArticles();
    getAndShowArticles();
})

submitInputBtn.addEventListener('click', event => {
    event.preventDefault();
    createNewArticle();
})