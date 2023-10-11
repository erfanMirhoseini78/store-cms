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
                // navProfile.setAttribute('href', 'index.html');
            })
    }
    else {
        navProfile.innerHTML = '';
        // navProfile.setAttribute('href', 'login.html');
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

export { showNameInNavbar }