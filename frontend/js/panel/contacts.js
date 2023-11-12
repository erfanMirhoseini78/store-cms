import {
    getAndShowContact,
    showContactBody,
    answerToContact,
    removeAnswer,
} from "./funcs/contacts.js";

window.showContactBody = showContactBody;
window.answerToContact = answerToContact;
window.removeAnswer = removeAnswer;

window.addEventListener('load', () => {
    getAndShowContact();
})