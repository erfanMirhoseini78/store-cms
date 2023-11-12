import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const getAndShowContact = async () => {
    const res = await fetch('http://localhost:4000/v1/contact');
    const contacts = await res.json();

    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    tableBodyWrapper.innerHTML = '';
    contacts.forEach((contact, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${contact.name}
                </td>
                <td>
                    ${contact.email}
                </td>
                <td>
                    ${contact.phone}
                </td>
                <td>
                    ${contact.createdAt.split('T')[0]}
                </td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn' onclick='showContactBody(${JSON.stringify(contact.body)})'>مشاهده</button>
                </td>
                <td>
                    <button type='button' class='btn ${contact.answer ? 'btn-success' : 'btn-primary'} delete-btn' onclick='answerToContact(${JSON.stringify(contact.email)})'>${contact.answer ? 'پاسخ داده شده است' : 'پاسخ دهید'}</button>
                </td>
                <td>
                    <button type='button' class='btn btn-info delete-btn' onclick=removeAnswer(${JSON.stringify(contact._id)})>حذف</button>
                </td>
            </tr>
            `)
    })

    return contacts;
}

const showContactBody = body => {
    showSwal(
        'info',
        body,
        'مشاهده کردم',
        () => { }
    )
}

const answerToContact = async email => {
    const adminToken = getToken();

    // Swal
    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "پاسخ",
        inputPlaceholder: "پاسخ خود را اینجا تایپ کنید ...",
        showCancelButton: true,
        confirmButtonText: 'ثبت پاسخ',
        cancelButtonText: 'منصرف شدید'
    });
    if (text) {
        Swal.fire(text);
    }

    const answerBodyInfo = {
        email,
        answer: text
    }

    const res = await fetch('http://localhost:4000/v1/contact/answer', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(answerBodyInfo)
    })
    const result = await res.json();

    if (res.status === 200) {
        showSwal(
            'success',
            'پاسخ با موفقیت ارسال شد',
            'هورااااا',
            () => {
                getAndShowContact();
            }
        )
    }
    else {
        showSwal(
            'error',
            'پاسخ به درستی ارسال نشد',
            'دوباره تلاش کن',
            () => { }
        )
    }

    console.log(res);

    return result;
}

const removeAnswer = async answerID => {
    const adminToken = getToken();

    showSwal(
        'question',
        'آیا از حذف پیغام اطمینان دارید ؟',
        'اره مطمئنم',
        async result => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:4000/v1/contact/${answerID}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${adminToken}`
                    }
                });
                const resulted = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'پیغام با موفقیت حذف شد',
                        'اینم از این',
                        () => {
                            getAndShowContact();
                        }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'پیغام به درستی حذف نشد',
                        'دوباره تلاش کن',
                        () => { }
                    )
                }

                return resulted;
            }
        }
    )
}

export {
    getAndShowContact,
    showContactBody,
    answerToContact,
    removeAnswer,
}