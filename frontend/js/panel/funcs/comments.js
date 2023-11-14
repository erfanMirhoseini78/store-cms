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
                    ${comment.createdAt.slice(0, 10)}
                </td>
                <td>
                    ${Array(5 - comment.score).fill(0).map(() => '<img src="./../../images/svgs/star.svg" alt="Rating" class="course-box__star">').join('')}

                    ${Array(comment.score).fill(0).map(() => '<img src="./../../images/svgs/star_fill.svg" alt="Rating" class="course-box__star-fill">').join('')}
                </td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn' onclick=showComment(${JSON.stringify(comment._id)})>مشاهده</button>
                </td>
                <td>
                    <button type='button' class='btn btn-info delete-btn' onclick=answerComment(${JSON.stringify(comment._id)})>پاسخ</button>
                </td>
                <td>
                    <button type='button' class='btn btn-success delete-btn' onclick=confirmComment(${JSON.stringify(comment._id)})>تایید</button>
                </td>
                <td>
                    <button type='button' class='btn btn-warning delete-btn' onclick=rejectionComment(${JSON.stringify(comment._id)})>رد</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick=removeComment(${JSON.stringify(comment._id)})>حذف</button>
                </td>
            </tr>
        `)
    })

    return comments;
}

const removeComment = async commentID => {
    console.log(commentID);
}

export {
    getAndShowComments,
    removeComment,
}