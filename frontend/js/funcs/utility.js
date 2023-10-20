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
    const userInfos = JSON.parse(localStorage.getItem('user'));
    return userInfos ? userInfos.token : null;
}

const isLogin = () => {
    const userInfos = localStorage.getItem("user");
    return userInfos ? true : false;
}

const getUrlParam = key => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(key);
}

const searchInArray = (array, searchProperty, searchValue) => {
    let outputArray = array.filter(item => (item[searchProperty].includes(searchValue)));

    return outputArray;
}

const computingTime = sessionsTime => {
    let hours = 0;
    let minuets = 0;

    sessionsTime.forEach(session => {
        hours += +session.time.split(':')[0];
        minuets += +session.time.split(':')[1];
    })

    let minuetsRounded = Math.ceil(minuets / 60);
    let totalTime = Math.ceil((hours + minuetsRounded) / 60);

    return totalTime;
}

const addParamToUrl = (param, value) => {
    let url = new URL(location.href);
    let searchParams = url.searchParams;
    searchParams.set(param, value);
    url.search = searchParams.toString();
    location.href = url.toString();
}

const paginateItems = (array, itemsPerPage, paginateParentElement, currentPage) => {
    paginateParentElement.innerHTML = "";

    let pageCount = Math.ceil(array.length / itemsPerPage); // 6 / 3 = 2
    let endIndex = itemsPerPage * currentPage; // 3 * 2 = 6
    let startIndex = endIndex - itemsPerPage; // 6 - 3 = 3;
    let paginatedItems = array.slice(startIndex, endIndex);

    // paginateParentElement.innerHTML = `
    // <li class="courses-pagination__item" data-page="right">
    //     <a href="#" class="courses-pagination__link">
    //         <i class="fas fa-long-arrow-alt-right courses-pagination__link-icon"></i>
    //     </a>
    // </li>`;



    for (let i = 1; i < pageCount + 1; i++) { // start PageNumber From 1
        paginateParentElement.insertAdjacentHTML('beforeend', `
        ${i === +currentPage ? `<li class="courses-pagination__item courses-pagination__item--active" onclick="addParamToUrl('page', ${i})">
            <a class="courses-pagination__link">
                ${i}
            </a>
        </li>` : `<li class="courses-pagination__item" onclick="addParamToUrl('page', ${i})">
            <a class="courses-pagination__link">
                ${i}
            </a>
        </li>`
            }        
        `)
    }




    // const coursesPaginationItems = document.querySelectorAll('.courses-pagination__item');

    // coursesPaginationItems.forEach(item => {
    //     item.addEventListener('click', event => {
    //         addParamToUrl(item, event);
    //     });
    // })

    // paginateParentElement.innerHTML += `
    // <li class="courses-pagination__item" data-page="left">
    //     <a href="#" class="courses-pagination__link">
    //         <i class="fas fa-long-arrow-alt-left courses-pagination__link-icon"></i>
    //     </a>
    // </li>`;

    // const coursesPaginationItem = document.querySelectorAll('.courses-pagination__item');

    // coursesPaginationItem.forEach(item => {
    //     item.addEventListener('click', event => {
    //         event.preventDefault();
    //         console.log(item.dataset.page);

    //         let currentPageTest = getUrlParam('page');

    //         currentPageTest = item.dataset.page;
    //         console.log(currentPageTest);
    //         console.log(location.search);
    //     })
    // })

    return paginatedItems;
}

export {
    showSwal,
    saveIntoLocalStorage,
    getFromLocalStorage,
    getToken,
    isLogin,
    getUrlParam,
    searchInArray,
    computingTime,
    paginateItems,
    addParamToUrl,
}