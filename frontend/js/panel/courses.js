import {
    getAllCourses,
} from "./funcs/courses.js";

const tableBodyWrapper = document.querySelector('.table-body__wrapper');

window.addEventListener('load', () => {
    tableBodyWrapper.innerHTML = "";

    let count = 0;
    getAllCourses()
        .then(courses => {
            console.log(courses);
            courses.forEach(course => {
                tableBodyWrapper.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>
                            <input type="checkbox" class="checkbox-table form-check-input">
                        </td>
                        <td>
                            ${++count}
                        </td>
                        <td id="name">
                            <a href="file:///D:/Project/Admin_Panel/Product/index.html?id=${course._id}">
                                ${course.name}
                            </a>
                        </td>
                        <td>
                            ${course.creator}
                        </td>
                        <td id="condition">
                            ${course.registers}
                        </td>
                        <td id="price">
                            ${course.support}
                        </td>
                        <td id="price">
                            ${course.price ? `${course.price} تومان` : 'رایگان'}
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
                        </td>
                    </tr>`)
            })
        })
})