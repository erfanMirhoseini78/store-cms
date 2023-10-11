import { getMe } from "./auth.js";
import { isLogin } from "./utility.js";

const showNameInNavbar = () => {
    const navProfile = document.querySelector('.nav__profile');
    const isUserLogin = isLogin();

    if (isUserLogin) {
        navProfile.innerHTML = '';
        getMe()
            .then(data => {
                navProfile.insertAdjacentHTML('beforeend', `
                    <span class="nav__profile-text">
                    ${data.name}
                    </span>
                `);
            })
    }
    else {
        navProfile.innerHTML = '';
        navProfile.insertAdjacentHTML('beforeend', `
            <a href="login.html" class="nav__profile-link">
                ورود
            </a>
                /
            <a href="register.html" class="nav__profile-link">
                ثبت نام
            </a>
        `);
    }
}

const renderTopbarMenus = async () => {
    const topbarList = document.querySelector('.top-bar__menu');

    const topbarMenu = await fetch('http://localhost:4000/v1/menus/topbar');
    const topbarMenuItems = await topbarMenu.json();

    const shuffledArray = topbarMenuItems.sort(() => 0.5 - Math.random());
    
    topbarList.innerHTML = '';
    shuffledArray.splice(0, 6).map(item => {
        topbarList.insertAdjacentHTML('beforeend', `
        <li class="top-bar__item">
            <a href="#${item.href}" class="top-bar__link">
                ${item.title}
            </a>
        </li>
        `)
    })
}

export { showNameInNavbar, renderTopbarMenus }