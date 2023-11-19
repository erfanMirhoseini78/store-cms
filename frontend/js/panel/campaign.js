import {
    setCampaign,
} from "./funcs/campaign.js"

window.addEventListener('load', () => {

})

const submitInputBtn = document.querySelector('#submit-input__btn');

submitInputBtn.addEventListener('click', event => {
    event.preventDefault();

    setCampaign();
})