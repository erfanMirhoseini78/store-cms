import {
    getToken
} from "./../../funcs/utility.js"

const insertNotificationHtmlTemplate = notifications => {
    const homeNotificationModalList = document.querySelector('.home-notification-modal-list');

    homeNotificationModalList.innerHTML = "";

    if (notifications.length) {
        notifications.forEach(notification => {
            homeNotificationModalList.insertAdjacentHTML('beforeend', `
                <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">
                        ${notification.msg}
                    </span>
                    <a href="#" onclick='seenNotification(${JSON.stringify(notifications)}, ${JSON.stringify(notification._id)})' class="home-notification-modal__link"> دیدم </a>
                </li>`)
        })
    }
    else {
        homeNotificationModalList.insertAdjacentHTML('beforeend', `
            <li class="alert alert-danger text-center">
                هیچ نوتیفیکیشنی وجود ندارد
            </li>`)
    }
}

const seenNotification = async (notifications, notificationID) => {
    let adminToken = getToken();

    const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${adminToken}`
        }
    })
    const result = await res.json();

    removeNotification(notifications, notificationID);

    return result;
}

const removeNotification = (notifications, notificationID) => {
    const notificationsFiltered = notifications.filter(notification => {
        return notification._id !== notificationID;
    })

    insertNotificationHtmlTemplate(notificationsFiltered);
}

export {
    insertNotificationHtmlTemplate,
    seenNotification,
}