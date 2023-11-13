import {
    getAndShowArticles,
    removeArticle,
} from "./funcs/articles.js";

window.removeArticle = removeArticle;

window.addEventListener('load', () => {
    getAndShowArticles();
})