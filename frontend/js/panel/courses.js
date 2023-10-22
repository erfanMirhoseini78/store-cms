import {
    getAllCourses,
    removeCourse,
    getCategory,
    selectCover,
    getStatus,
    createNewCourse,
} from "./funcs/courses.js";

window.removeCourse = removeCourse;

const submitBtnInput = document.querySelector('#submit-btn__input');

window.addEventListener('load', () => {
    getAllCourses();
    getCategory();
    selectCover();
    getStatus();

    submitBtnInput.addEventListener('click', event => {
        event.preventDefault();

        createNewCourse();
    })
})