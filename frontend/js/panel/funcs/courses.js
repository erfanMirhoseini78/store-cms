import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

let categoryID = -1;
let statusValue = 'presell';
let courseCover = null;

//! Get All Courses
const getAllCourses = async () => {
    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch('http://localhost:4000/v1/courses');
    const courses = await res.json();

    tableBodyWrapper.innerHTML = "";

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
                
                    ${Array(5 - course.courseAverageScore).fill(0).map(() => '<img src="./../../images/svgs/star.svg" alt="Rating" class="course-box__star">').join('')}

                    ${Array(course.courseAverageScore).fill(0).map(() => '<img src="./../../images/svgs/star_fill.svg" alt="Rating" class="course-box__star-fill">').join('')}

                </td>
                <td>
                    ${course.categoryID.title}
                </td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button onclick=removeCourse(${JSON.stringify(course._id)}) type="button" class="btn btn-danger" id="delete-btn">حذف</button>
                </td>
            </tr>`)
    })

    return courses;
}

//! PrepareCreateNewCourse 
const prepareCreateNewCourse = async () => {
    const categoryList = document.querySelector('.category-list');
    const file = document.getElementById('file');
    const presell = document.querySelector('#presell');
    const start = document.querySelector('#start');

    let res = await fetch('http://localhost:4000/v1/category');
    let categories = await res.json();

    categories.forEach(category => {
        categoryList.insertAdjacentHTML('beforeend', `
            <option value="${category._id}">
                ${category.title}
            </option>
        `)
    })

    categoryList.addEventListener('change', event => {
        categoryID = event.target.value;
    })

    file.addEventListener('change', event => {
        courseCover = event.target.files[0];
    })

    presell.addEventListener('change', event => statusValue = event.target.value);
    start.addEventListener('change', event => statusValue = event.target.value);
}

//! Create New Courses
const createNewCourse = async () => {
    let adminToken = getToken();

    const name = document.getElementById('name');
    const support = document.getElementById('support');
    const shortName = document.getElementById('short-name');
    const price = document.getElementById('price');
    const description = document.getElementById('description');

    let formData = new FormData();

    formData.append('name', name.value.trim());
    formData.append('description', description.value.trim());
    formData.append('shortName', shortName.value.trim());
    formData.append('categoryID', categoryID);
    formData.append('price', price.value.trim());
    formData.append('support', support.value.trim());
    formData.append('status', statusValue);
    formData.append('cover', courseCover);

    const res = await fetch('http://localhost:4000/v1/courses', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
    });
    const course = await res.json();

    if (res.status === 201) {
        showSwal(
            "success",
            "دوره جدید با موفقیت ساخته شد",
            "خیلی هم عالی",
            () => {
                getAllCourses();
            }
        )
    }
    else {
        showSwal(
            "error",
            "لطفا اطلاعات دوره جدید رو به درستی وارد کنید",
            "بازم تلاش میکنم",
            () => { }
        )
    }
}

//! Remove Courses
const removeCourse = async courseID => {
    const adminToken = getToken();

    showSwal(
        "question",
        "آیا از حذف دوره اطمینان دارید؟",
        "اره",
        async output => {
            if (output.value) {
                let res = await fetch(`http://localhost:4000/v1/courses/${courseID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    }
                });
                let result = await res.json();

                if (res.status === 200) {
                    showSwal(
                        "success",
                        "دوره با موفقیت حذف شد",
                        "خیلی هم عالی",
                        () => {
                            getAllCourses();
                        }
                    )
                }
                else {
                    showSwal(
                        "error",
                        "حذف دوره با مشکل مواجه شده!",
                        "بازم تلاش کن",
                        () => { }
                    )
                }

                return result;
            }
        },
        "نه",
    )
}

export {
    getAllCourses,
    removeCourse,
    prepareCreateNewCourse,
    createNewCourse,
}