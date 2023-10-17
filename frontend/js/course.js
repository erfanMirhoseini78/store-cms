import {
    getCourseDetails,
    getAndShowRelatedCourses,
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getCourseDetails();
    getAndShowRelatedCourses();
})

const courseInfosHeaderShortUrlWrapper = document.querySelector('.course-infos__header-short-url-wrapper');
const courseInfosShortUrl = document.querySelector('.course-infos__short-url');

courseInfosHeaderShortUrlWrapper.addEventListener('click', event => {
    event.preventDefault();

    let txt = courseInfosShortUrl.innerText;
    navigator.clipboard.writeText(txt);
})