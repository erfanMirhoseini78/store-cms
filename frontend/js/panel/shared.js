import {
    getAdminInfos,
    logOut,
} from "./funcs/utils.js";

import {
    insertNotificationHtmlTemplate,
    seenNotification,
} from "./funcs/notification.js";

import {
    showSwal,
} from "../funcs/utility.js";

//! bind Event Handler in File With Type Module
window.seenNotification = seenNotification;

const adminName = document.querySelector('#admin-name');
const homeNotificationModal = document.querySelector('.home-notification-modal');
const homeNotificationBtn = document.querySelector('#home-notification-modal__btn');
const logoutBtn = document.querySelector('#logout-btn');

window.addEventListener('load', () => {
    getAdminInfos()
        .then(admin => {
            // Protect CMS Routes
            if (admin.role === 'ADMIN') {
                // Show Admin Name in CMS Home Page
                adminName.innerHTML = admin.name;
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
        });
})

logoutBtn.addEventListener('click', event => {
    event.preventDefault();

    showSwal(
        'question',
        'آیا از خروج اطمینان دارید ؟',
        'خیالت راحت',
        async result => {
            if (result.isConfirmed) {
                showSwal(
                    'success',
                    'با موفقیت خارج شدید !',
                    'کارت درسته',
                    () => {
                        logOut();
                    }
                )
            }
            else {
                showSwal(
                    'error',
                    'در خارج شدن از اکانت مشکلی پیش آمده است',
                    'حلش میکنیم',
                    () => { }
                )
            }
        }
    )
})