import {
    insertCourseBoxHtmlTemplate,
    showAllCoursesInCoursesPage,
} from "./funcs/shared.js";

import {
    paginateItems,
    getUrlParam,
    addParamToUrl,
} from "./funcs/utility.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener('load', () => {
    showAllCoursesInCoursesPage()
        .then(courses => {
            //! Pagination
            const coursesPaginationList = document.querySelector('.courses-pagination__list');
            const coursesWrapper = document.querySelector('#courses-wrapper');

            let coursesShowType = 'row';
            const currentPage = getUrlParam('page');
            const showCourses = paginateItems([...courses], 3, coursesPaginationList, currentPage);

            insertCourseBoxHtmlTemplate([...showCourses], coursesShowType, coursesWrapper, "هیچ دوره‌ای برای این دسته بندی وجود ندارد :/");
        });

})