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
                <button type='button' class='btn btn-danger delete-btn' onclick=removeUser(${JSON.stringify(user._id)})>حذف</button>
            </td>
        </tr>`)
    })

    return users;
}

const removeUser = async userID => {
    let userToken = getToken();

    showSwal(
        'question',
        'آیا از حذف کاربر اطمینان دارید ؟',
        'اره',
        async result => {
            if (result.value) {
                const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                })

                const user = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'کاربر با موفقیت حذف شد',
                        'ایولاااا',
                        () => {
                            getAndShowAllUsers();
                        }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'متاسفانه کاربر حذف نشد!!!',
                        'عیب نداره',
                        () => { }
                    )
                }

                return user;
            }
        }
    )
}

export {
    getAndShowAllUsers,
    removeUser,
}