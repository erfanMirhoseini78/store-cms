import {
    getAndShowDiscounts,
    removeDiscount,
    prepareCreateNewDiscount,
    createNewDiscount,
} from "./funcs/discounts.js"

window.removeDiscount = removeDiscount;

const submitInputBtn = document.querySelector('#submit-input__btn');

window.addEventListener('load', () => {
    getAndShowDiscounts();
    prepareCreateNewDiscount();
})

submitInputBtn.addEventListener('click', event => {
    event.preventDefault();
    createNewDiscount();
})