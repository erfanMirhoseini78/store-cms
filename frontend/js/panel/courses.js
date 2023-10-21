import {
    getAllCourses,
    removeCourse,
} from "./funcs/courses.js";

window.removeCourse = removeCourse;

window.addEventListener('load', () => {
    getAllCourses();
})