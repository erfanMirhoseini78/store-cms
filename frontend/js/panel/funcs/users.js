import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";


const getAndShowAllUsers = async () => {
    const userToken = getToken();
    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch('http://localhost:4000/v1/users', {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    })
    const users = await res.json();

    tableBodyWrapper.innerHTML = "";
    users.forEach((user, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
        <tr>
            <td>
                ${index + 1}
            </td>
            <td>
                ${user.name}
            </td>
            <td>
                ${user.username}
            </td>
            <td>
                ${user.email}
            </td>
            <td>
                ${user.phone}
            </td>
            <td>
                ${user.role}
            </td>
            <td>
                <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger delete-btn'>حذف</button>
            </td>
        </tr>`)
    })

    return users;
}

export {
    getAndShowAllUsers,
}