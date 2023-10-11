import { getMe } from "./auth.js";
import { isLogin, getToken } from "./utility.js";

const showNameInNavbar = () => {
    const navProfile = document.querySelector('.nav__profile');
    const isUserLogin = isLogin();

    if (isUserLogin) {
        navProfile.innerHTML = '';
        getMe()
            .then(data => {
                navProfile.insertAdjacentHTML('beforeend', `
                    <span class="nav__profile-text">
                    ${data.name}
                    </span>
                `);
            })
    }
    else {
        navProfile.innerHTML = '';
        navProfile.insertAdjacentHTML('beforeend', `
            <a href="login.html" class="nav__profile-link">
                ورود
            </a>
                /
            <a href="register.html" class="nav__profile-link">
                ثبت نام
            </a>
        `);
    }
}

const renderTopbarMenus = async () => {
    const topbarList = document.querySelector('.top-bar__menu');

    const topbarMenu = await fetch('http://localhost:4000/v1/menus/topbar');
    const topbarMenuItems = await topbarMenu.json();

    const shuffledArray = topbarMenuItems.sort(() => 0.5 - Math.random());

    topbarList.innerHTML = '';
    shuffledArray.splice(0, 6).map(item => {
        topbarList.insertAdjacentHTML('beforeend', `
        <li class="top-bar__item">
            <a href="#${item.href}" class="top-bar__link">
                ${item.title}
            </a>
        </li>
        `)
    })
}

const getAndShowAllCourses = async () => {
    const coursesContainer = document.querySelector('#courses-container');

    const getCourses = await fetch('http://localhost:4000/v1/courses');
    const allCourses = await getCourses.json();

    coursesContainer.innerHTML = '';
    allCourses.slice(0, 6).forEach(course => {
        coursesContainer.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                    <div class="course-box">
                        <a href="#" class="course-box__logo">
                            <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                        </a>
                        <div class="course-box__main">
                            <a href="#" class="course-box__title">
                            ${course.name}
                            </a>

                            <div class="course-box__rating-teacher">
                                <div class="courser-box__teacher">
                                    <svg class="svg-inline--fa fa-chalkboard-user course-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                                    <a href="#" class="course-box__teacher-link">
                                        ${course.creator}
                                    </a>
                                </div>

                                <div class="course-box__rating">
                                
                                    ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svgs/star.svg" alt="Rating" class="course-box__star">').join('')}

                                    ${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svgs/star_fill.svg" alt="Rating" class="course-box__star">').join('')}

                                </div>
                            </div>

                            <div class="course-box__status">
                                <div class="course-box__users">
                                    <svg class="svg-inline--fa fa-users course-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg><!-- <i class="fas fa-users course-box__users-icon"></i> Font Awesome fontawesome.com -->
                                    <span class="course-box__users-count">
                                        ${course.registers}
                                    </span>
                                </div>
                                <span class="course-box__price">
                                    ${course.price ? course.price.toLocaleString() : "رایگان"}
                                </span>
                            </div>
                        </div>

                        <div class="course-box__footer">
                            <a href="#" class="course-box__footer-text">
                                مشاهده اطلاعات
                                <svg class="svg-inline--fa fa-arrow-left course-box__footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg><!-- <i class="fas fa-arrow-left course-box__footer-icon"></i> Font Awesome fontawesome.com -->
                            </a>
                        </div>
                    </div>
                </div>
            `)
    })
}

const getAndShowPopularCourses = async () => {
    const popularCoursesContainer = document.querySelector('#popular-courses__container');

    const getPopularCourses = await fetch('http://localhost:4000/v1/courses/popular');
    const showPopularCourses = await getPopularCourses.json();

    popularCoursesContainer.innerHTML = '';
    showPopularCourses.slice(0, 4).forEach(course => {
        popularCoursesContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <div class="course-box">
                    <a href="#" class="course-box__logo">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href="#" class="course-box__title">
                            ${course.name}
                        </a>

                        <div class="course-box__rating-teacher">
                            <div class="courser-box__teacher">
                                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                <a href="#" class="course-box__teacher-link">
                                    ${course.creator}
                                </a>
                            </div>

                            <div class="course-box__rating">

                                ${Array(5 - course.courseAverageScore).fill('').map(() => `<img src="./images/svgs/star.svg" alt="Rating" class="course-box__star">`).join('')}

                                ${Array(course.courseAverageScore).fill(0).map(score => ` <img src="./images/svgs/star_fill.svg" alt="Rating"
                                class="course-box__star">`).join('')}

                            </div>
                        </div>

                        <div class="course-box__status">
                            <div class="course-box__users">
                                <i class="fas fa-users course-box__users-icon"></i>
                                <span class="course-box__users-count">
                                    ${course.registers}
                                </span>
                            </div>
                            <span class="course-box__price">
                                ${course.price ? course.price.toLocaleString() : "رایگان"}
                            </span>
                        </div>
                    </div>

                    <div class="course-box__footer">
                        <a href="#" class="course-box__footer-text">
                            مشاهده اطلاعات
                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        `)
    })
}

const getAndShowPreSellCourses = async () => {
    const presellCoursesContainer = document.querySelector('#presell-courses__container');

    const getPreSellCourses = await fetch('http://localhost:4000/v1/courses/presell');
    const showPreSellCourses = await getPreSellCourses.json();

    presellCoursesContainer.innerHTML = '';
    showPreSellCourses.slice(0, 4).forEach(course => {
        presellCoursesContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <div class="course-box">
                    <a href="#" class="course-box__logo">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href="#" class="course-box__title">
                            ${course.name}
                        </a>

                        <div class="course-box__rating-teacher">
                            <div class="courser-box__teacher">
                                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                <a href="#" class="course-box__teacher-link">
                                    ${course.creator}
                                </a>
                            </div>

                            <div class="course-box__rating">
                                
                                ${Array(5 - course.courseAverageScore).fill('').map(() => `<img src="./images/svgs/star.svg" alt="Rating" class="course-box__star">`).join('')}

                                ${Array(course.courseAverageScore).fill(0).map(score => ` <img src="./images/svgs/star_fill.svg" alt="Rating"
                                class="course-box__star">`).join('')}

                            </div>
                        </div>

                        <div class="course-box__status">
                            <div class="course-box__users">
                                <i class="fas fa-users course-box__users-icon"></i>
                                <span class="course-box__users-count">
                                    ${course.registers}
                                </span>
                            </div>
                            <span class="course-box__price">
                                ${course.price ? course.price.toLocaleString() : "رایگان"}
                            </span>
                        </div>
                    </div>

                    <div class="course-box__footer">
                        <a href="#" class="course-box__footer-text">
                            مشاهده اطلاعات
                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        `)
    })
}

const getAndShowArticles = () => {
    const articleContainer = document.querySelector('#article__container');

    articleContainer.innerHTML = '';
    const userToken = getToken();

    fetch('http://localhost:4000/v1/articles', {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    })
        .then(res => res.json())
        .then(articles => {
            articles.slice(0, 6).forEach(article => {
                articleContainer.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                            <div class="article-card">
                                <div class="articel-card__header">
                                    <a href="#" class="article-card__logo">
                                        <img src=http://localhost:4000/courses/covers/${article.cover} alt="Articel Cover" class="article-card__img">
                                    </a>
                                </div>

                                <div class="articel-card__content">
                                    <a href="#" class="article-card__title">
                                        ${article.title}
                                    </a>
                                    <p class="article-card__desc">
                                        ${article.description}
                                    </p>
                                    <a href="#" class="article-card__btn">
                                        بیشتر بخوانید
                                    </a>
                                </div>
                            </div>
                        </div>
                `)
            })
        })
}

export { showNameInNavbar, renderTopbarMenus, getAndShowAllCourses, getAndShowPopularCourses, getAndShowPreSellCourses, getAndShowArticles }