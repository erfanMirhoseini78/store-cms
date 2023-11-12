import {
    getAndShowCategories,
    removeCategory,
    createCategory,
} from "./funcs/category.js";

window.removeCategory = removeCategory;

const submitCategoryBtn = document.getElementById('submit-category__btn');

window.addEventListener('load', () => {
    getAndShowCategories();

    submitCategoryBtn.addEventListener('click', event => {
        event.preventDefault();

        createCategory();
    })
})