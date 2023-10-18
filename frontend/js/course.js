import {
    getCourseDetails,
    getAndShowRelatedCourses,
    submitComments,
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getCourseDetails();
    getAndShowRelatedCourses();
})

const courseInfosHeaderShortUrlWrapper = document.querySelector('.course-infos__header-short-url-wrapper');
const courseInfosShortUrl = document.querySelector('.course-infos__short-url');
const commentsRespondBtn = document.querySelector('.comments__respond-btn');

courseInfosHeaderShortUrlWrapper.addEventListener('click', event => {
    event.preventDefault();

    let txt = courseInfosShortUrl.innerText;
    navigator.clipboard.writeText(txt);
})

commentsRespondBtn.addEventListener('click', submitComments);