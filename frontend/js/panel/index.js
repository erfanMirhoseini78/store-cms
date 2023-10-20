import {
    getAdminInfos,
} from "./funcs/utils.js";

import {
    insertNotificationHtmlTemplate,
    seenNotification,
} from "./funcs/notification.js";

//! bind Event Handler in File With Type Module
window.seenNotification = seenNotification;

window.addEventListener('load', () => {
    const adminName = document.querySelector('#admin-name');
    const adminWelcomeName = document.querySelector('#admin-welcome-name');
    const homeNotificationModal = document.querySelector('.home-notification-modal');
    const homeNotificationBtn = document.querySelector('#home-notification-modal__btn');

    getAdminInfos()
        .then(admin => {
            // Protect CMS Routes
            if (admin.role === 'ADMIN') {
                // Show Admin Name in CMS Home Page
                adminName.innerHTML = admin.name;
                adminWelcomeName.innerHTML = admin.name;
            }
            else {
                location.replace('../../login.html');
            }

            homeNotificationBtn.addEventListener('mouseenter', () => {
                homeNotificationModal.classList.add('active-modal-notfication');
            })
            homeNotificationModal.addEventListener('mouseleave', () => {
                homeNotificationModal.classList.remove('active-modal-notfication');
            })

            insertNotificationHtmlTemplate(admin.notifications);
        })
})