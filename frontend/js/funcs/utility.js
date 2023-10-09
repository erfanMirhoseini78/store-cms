const showSwal = (icon, title, buttons, callback) => {
    Swal.fire({
        icon: icon,
        title: title,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: buttons,
    })
        .then(result => callback(result))
}

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = key => {
    return JSON.stringify(localStorage.getItem(key));
}

const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token;
}

export { showSwal, saveIntoLocalStorage, getFromLocalStorage, getToken }