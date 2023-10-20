import {
    getAdminInfos,
} from "./funcs/utils.js";

window.addEventListener('load', () => {
    const adminName = document.querySelector('#admin-name');
    const adminWelcomeName = document.querySelector('#admin-welcome-name');

    getAdminInfos()
        .then(admin => {
            console.log(admin);

            // Protect CMS Routes
            if (admin.role === 'ADMIN') {
                // Show Admin Name in CMS Home Page
                adminName.innerHTML = admin.name;
                adminWelcomeName.innerHTML = admin.name;
            }
            else {
                location.replace('../../login.html');
            }
        });
})