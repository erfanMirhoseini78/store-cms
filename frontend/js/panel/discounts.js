import {
    getAndShowDiscounts,
    removeDiscount,
} from "./funcs/discounts.js"

window.removeDiscount = removeDiscount;

window.addEventListener('load', () => {
    getAndShowDiscounts();
})