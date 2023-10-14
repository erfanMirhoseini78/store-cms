import {
    showNameInNavbar,
    renderTopbarMenus,
    getAndShowMenus,
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    showNameInNavbar();
    renderTopbarMenus();
    getAndShowMenus();
})