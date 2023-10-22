import {
    getAllCourses,
    removeCourse,
    prepareCreateNewCourse,
    createNewCourse,
} from "./funcs/courses.js";

window.removeCourse = removeCourse;

window.addEventListener('load', () => {
    const submitBtnInput = document.querySelector('#submit-btn__input');

    getAllCourses();
    prepareCreateNewCourse();

    submitBtnInput.addEventListener('click', event => {
        event.preventDefault();
        createNewCourse();
    })
})