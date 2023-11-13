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
                    ${session.free ? 'رایگان' : 'پولی'}
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
    console.log(sessionID);
}

const createSession = async () => {

}


export {
    getAndShowSessions,
    editSession,
    removeSession,
    createSession,
}

