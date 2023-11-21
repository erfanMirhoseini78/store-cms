import {
    getToken,
} from "./../../funcs/utility.js"

const getAdminInfos = async () => {
    let userToken = getToken();

    const res = await fetch('http://localhost:4000/v1/auth/me', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })

    const admin = await res.json();
    return admin;
}

const logOut = () => {
    localStorage.removeItem('user');

    return true;
}

export {
    getAdminInfos,
    logOut,
}