const getAndShowAllMenus = async () => {
    const tableBody = document.querySelector('.table-body');

    const res = await fetch('http://localhost:4000/v1/menus/all')
    const menus = await res.json();

    tableBody.innerHTML = "";
    console.log(menus);
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
                    <button type="button" class="btn btn-danger delete-btn">حذف</button>
                </td>
            </tr>`)
    })

    return menus;
}

export {
    getAndShowAllMenus,
}