import {
    getAndShowCategoryCourses,
    insertCourseBoxHtmlTemplate,
    coursesSorting,
} from "./funcs/shared.js";

import {
    searchInArray,
} from "./funcs/utility.js";

const courseCategoryContainer = document.querySelector('#course-category__container');
const coursesTopbarRowBtn = document.querySelector('.courses-topbar__row-btn');
const coursesTopbarColumnBtn = document.querySelector('.courses-topbar__column-btn');
const coursesFilteringSelections = document.querySelectorAll('.courses-topbar__selections-item');
const coursesTopbarSelectionsTitle = document.querySelector('.courses-topbar__selections-title');
const coursesTopbarInput = document.querySelector('.courses-topbar__input');


window.onload = () => {
    getAndShowCategoryCourses()
        .then(responseCourses => {
            let courses = [...responseCourses];
            let searchedCourses = [...responseCourses]
            let coursesShowType = 'row';

            //! Show Category Courses By User Filtering Method
            coursesFilteringSelections.forEach(coursesFilteringSelection => {
                coursesFilteringSelection.addEventListener('click', event => {
                    coursesFilteringSelections.forEach(selectionElem => {
                        selectionElem.classList.remove('courses-topbar__selections-item--active');
                    })

                    event.target.classList.add('courses-topbar__selections-item--active');

                    coursesTopbarSelectionsTitle.innerHTML = event.target.innerText + `<i class="fas fa-angle-up courses-topbar__selections-icon"></i>`;

                    let userFilteringSelection = event.target.dataset.key;

                    let showCourses = coursesSorting(searchedCourses, userFilteringSelection);

                    insertCourseBoxHtmlTemplate(showCourses, coursesShowType, courseCategoryContainer, "هیچ دوره‌ای برای این دسته بندی وجود ندارد :/");
                })
            })


            //! Show Category Courses By row showType (User Selection)
            coursesTopbarColumnBtn.addEventListener('click', () => {
                coursesShowType = 'column';
                coursesTopbarColumnBtn.classList.add('courses-topbar__btn-icon--active');
                coursesTopbarRowBtn.classList.remove('courses-topbar__btn-icon--active');

                insertCourseBoxHtmlTemplate(searchedCourses, coursesShowType, courseCategoryContainer, "هیچ دوره‌ای برای این دسته بندی وجود ندارد :/");
            })
            coursesTopbarRowBtn.addEventListener('click', () => {
                coursesShowType = 'row';
                coursesTopbarRowBtn.classList.add('courses-topbar__btn-icon--active');
                coursesTopbarColumnBtn.classList.remove('courses-topbar__btn-icon--active');

                insertCourseBoxHtmlTemplate(searchedCourses, coursesShowType, courseCategoryContainer, "هیچ دوره‌ای برای این دسته بندی وجود ندارد :/");
            })


            //! Show Category Courses By row showType
            insertCourseBoxHtmlTemplate(courses, coursesShowType, courseCategoryContainer, "هیچ دوره‌ای برای این دسته بندی وجود ندارد :/");


            //! Handle Search in Courses 
            coursesTopbarInput.addEventListener('keyup', event => {
                const showCourses = searchInArray(courses, 'name', event.target.value);

                console.log(showCourses.length);

                searchedCourses = showCourses;

                insertCourseBoxHtmlTemplate(showCourses, coursesShowType, courseCategoryContainer, "هیچ دوره‌ای مطابق با جستجوی شما وجود ندارد :/");
            })
        })
}