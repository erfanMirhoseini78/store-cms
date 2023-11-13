import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const selectElem = document.querySelector('.select');
const fileElem = document.querySelector('#file');
const freeElem = document.querySelector('#free');
const moneyElem = document.querySelector('#money');

let courseID = -1;
let sessionVideo = null;
let statusSession = '1';

const getAndShowSessions = async () => {
    const tableBodyWrapper = document.querySelector('.table-body__wrapper')

    const res = await fetch('http://localhost:4000/v1/courses/sessions');
    const sessions = await res.json();

    tableBodyWrapper.innerHTML = "";
    sessions.forEach((session, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${session.title}
                </td>
                <td>
                    ${session.time}
                </td>
                <td>
                    ${session.createdAt.slice(0, 10)}
                </td>
                <td>
                        ${session.free ? 'رایگان' : 'غیر رایگان'}
                </td>
                <td>
                    ${session.course.name}
                </td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn' onclick=editSession(${JSON.stringify(session._id)})>ویرایش</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick=removeSession(${JSON.stringify(session._id)})>حذف</button>
                </td>
            </tr>
        `)
    })

    return sessions;
}

const editSession = async sessionID => {
    console.log(sessionID);
}

const removeSession = async sessionID => {
    const adminToken = getToken();

    showSwal(
        'question',
        'آیا از پاک کردن جلسه مورد نظر اطمینان دارید ؟',
        'اره',
        async result => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${adminToken}`
                    }
                });
                const result = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'جلسه مورد نظر با موفقیت حذف شد',
                        'اینم از این',
                        () => {
                            getAndShowSessions();
                        }
                    )
                }
                else {
                    showSwal(
                        'success',
                        'در حذف جلسه مورد نظر مشکلی به وجود آمده است',
                        'درستش میکنیم',
                        () => { }
                    )
                }

                return result;
            }
        }
    )

}

const prepareCreateNewSesion = async () => {
    const res = await fetch('http://localhost:4000/v1/courses');
    const courses = await res.json();

    courses.forEach(course => {
        selectElem.insertAdjacentHTML('beforeend', `
            <option value="${course._id}">
                ${course.name}
            </option>
        `)
    })

    selectElem.addEventListener('change', event => courseID = event.target.value)
    fileElem.addEventListener('change', event => sessionVideo = event.target.files[0])
    freeElem.addEventListener('change', event => statusSession = event.target.value)
    moneyElem.addEventListener('change', event => statusSession = event.target.value)
}

const createSession = async () => {
    const adminToken = getToken();
    const titleElem = document.querySelector('#title');
    const timeElem = document.querySelector('#time');

    let formData = new FormData();

    formData.append('title', titleElem.value.trim());
    formData.append('time', timeElem.value.trim());
    formData.append('video', sessionVideo);
    formData.append('free', statusSession);

    const res = await fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${adminToken}`
        },
        body: formData
    })
    const result = await res.json();

    if (res.status === 201) {
        showSwal(
            'success',
            'جلسه با موفقیت آپلود شد',
            'خیلی هم عالی',
            () => {
                titleElem.value = "";
                timeElem.value = "";
                fileElem.value = "";
                selectElem.value = '-1';
                freeElem.checked = true;
                getAndShowSessions();
            }
        )
    }
    else {
        showSwal(
            'error',
            'آپلود جلسه با خطا مواجه شد',
            'عیب نداره',
            () => { }
        )
    }

    return result;
}

export {
    getAndShowSessions,
    editSession,
    removeSession,
    prepareCreateNewSesion,
    createSession,
}

