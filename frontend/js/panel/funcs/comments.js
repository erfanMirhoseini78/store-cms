import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const getAndShowComments = async () => {
    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch('http://localhost:4000/v1/comments');
    const comments = await res.json();

    tableBodyWrapper.innerHTML = "";
    comments.forEach((comment, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${comment.creator.name}
                </td>
                <td>
                    ${comment.course}
                </td>
                <td>
                    ${comment.createdAt.split('T')[0]}
                </td>
                <td>
                    ${Array(5 - comment.score).fill(0).map(() => '<img src="./../../images/svgs/star.svg" alt="Rating" class="course-box__star">').join('')}

                    ${Array(comment.score).fill(0).map(() => '<img src="./../../images/svgs/star_fill.svg" alt="Rating" class="course-box__star-fill">').join('')}
                </td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn' onclick='showComment(${JSON.stringify(comment)})'>مشاهده</button>
                </td>
                <td>
                    <button type='button' class='btn ${comment.answer ? 'btn-success' : 'btn-info'} delete-btn' onclick=answerComment(${JSON.stringify(comment._id)})>${comment.answer ? 'پاسخ داده شده' : 'در انتظار پاسخ'}</button>
                </td>
                <td>
                    <button type='button' class='btn btn-warning delete-btn' onclick=acceptComment(${JSON.stringify(comment._id)})>تایید</button>
                </td>
                <td>
                    <button type='button' class='btn btn-secondary delete-btn' onclick=rejectionComment(${JSON.stringify(comment._id)})>رد</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick=removeComment(${JSON.stringify(comment._id)})>حذف</button>
                </td>
            </tr>
        `)
    })

    return comments;
}

const answerComment = async commentID => {
    console.log(commentID);
}

const removeComment = async commentID => {
    console.log(commentID);
}

const showComment = commentObj => {
    console.log(commentObj._id);
    showSwal(
        'info',
        commentObj.body,
        'رویت شد',
        () => { }
    )
}

const acceptComment = async commentID => {
    const adminToken = getToken();

    showSwal(
        'question',
        'آیا کامنت مورد نظر را تایید میکنید ؟',
        'با کمال میل',
        async result => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${adminToken}`
                    }
                });
                const result = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'کامنت با موفقیت تایید شد',
                        'اوکیه',
                        () => {
                            getAndShowComments();
                        }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'در تایید کامنت خطایی رخ داده است',
                        'عیبی نداره',
                        () => { }
                    )
                }

                return result;
            }
        }
    )
}

const rejectionComment = async commentID => {
    const adminToken = getToken();

    showSwal(
        'question',
        'آیا کامنت مورد نظر را رد میکنید ؟',
        'با کمال میل',
        async result => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${adminToken}`
                    }
                });
                const result = await res.json();

                if (res.status === 200) {
                    showSwal(
                        'success',
                        'کامنت با موفقیت رد شد',
                        'خیالت تخت',
                        () => {
                            getAndShowComments();
                        }
                    )
                }
                else {
                    showSwal(
                        'error',
                        'در رد کامنت خطایی رخ داده است',
                        'قدا سرت',
                        () => { }
                    )
                }

                return result;
            }
        }
    )
}

export {
    getAndShowComments,
    removeComment,
    showComment,
    acceptComment,
    rejectionComment,
}