const getAllCourses = async () => {
    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch('http://localhost:4000/v1/courses');
    const courses = await res.json();

    tableBodyWrapper.innerHTML = "";
    console.log(courses);

    courses.forEach((course, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${course.name}
                </td>
                <td>
                    ${course.creator}
                </td>
                <td>
                    ${course.registers}
                </td>
                <td>
                    ${course.support}
                </td>
                <td>
                    ${course.price ? `${course.price} تومان` : 'رایگان'}
                </td>
                <td>
                    ${course.isComplete ? 'به اتمام رسیده' : 'در حال برگزاری'}
                </td>
                <td class="course-score">
                
                    ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./../../images/svgs/star.svg" alt="Rating" class="course-box__star">').join('')}
                    ${Array(course.courseAverageScore).fill(0).map(score => '<img src="./../../images/svgs/star_fill.svg" alt="Rating" class="course-box__star-fill">').join('')}

                </td>
                <td>
                    ${course.categoryID.title}
                </td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
                </td>
            </tr>`)
    })

    return courses;
}

export {
    getAllCourses,
}