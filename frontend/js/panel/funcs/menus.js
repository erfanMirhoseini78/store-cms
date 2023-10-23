import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

let menuID = null; // undefined 

const getAndShowAllMenus = async () => {
    const tableBody = document.querySelector('.table-body');

    const res = await fetch('http://localhost:4000/v1/menus/all')
    const menus = await res.json();

    tableBody.innerHTML = "";
    menus.forEach((menu, index) => {
        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${menu.title}
                </td>
                <td>
                    <a href="#">
                        ${menu.href}
                    </a>
                </td>
                <td>
                    ${menu.parent ? menu.parent.title : "-----"}
                </td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger delete-btn" onclick=removeMenu(${JSON.stringify(menu._id)})>حذف</button>
                </td>
            </tr>`)
    })

    return menus;
}

const removeMenu = async menuID => {
    let adminToken = getToken();

    showSwal(
        'question',
        'مطمئن هستید که منو رو میخواید پاک کنید؟',
        'اره',
        async result => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    }
                });

                const menuRemoved = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'منو با موفقیت حذف شد',
                        'دمت گرم',
                        () => {
                            getAndShowAllMenus();
                        }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'موفق به حذف منو نشدی هنوز',
                        'بازم تلاش کن',
                        () => { }
                    )
                }

                return menuRemoved;
            }
        }
    )
}

const prepareCreateNewMenu = async () => {
    const selectElem = document.querySelector('.select');

    const res = await fetch('http://localhost:4000/v1/menus');
    const menusParent = await res.json();

    menusParent.forEach(menu => {
        selectElem.insertAdjacentHTML('beforeend', `
            <option value="${menu._id}">
                ${menu.title}
            </option>
        `)
    })

    selectElem.addEventListener('change', event => {
        menuID = event.target.value;
    })

    return menusParent;
}

const createNewMenu = async () => {
    let adminToken = getToken();

    let selectElem = document.querySelector('.select');
    const titleElem = document.querySelector('#title');
    const hrefElem = document.querySelector('#href');

    const newMenuInfos = {
        title: titleElem.value.trim(),
        href: hrefElem.value.trim(),
        parent: menuID,
    }

    const res = await fetch('http://localhost:4000/v1/menus', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenuInfos)
    })
    const menu = await res.json();

    if (res.status === 201) {
        showSwal(
            'success',
            'منو با موفقیت ایجاد شد',
            'هوراااااا',
            () => {
                getAndShowAllMenus();
                titleElem.value = "";
                hrefElem.value = "";
                selectElem.firstElementChild.setAttribute('selected', 'selected');
            }
        )
    }
    else {
        showSwal(
            'error',
            'اطلاعات مورد نیاز برای ایجاد منو رو به درستی وارد کنید',
            'یه بار دیگه شانستو امتحان کن',
            () => { }
        )
    }

    return menu;
}

export {
    getAndShowAllMenus,
    removeMenu,
    prepareCreateNewMenu,
    createNewMenu,
}