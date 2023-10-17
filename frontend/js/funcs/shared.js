import {
    getMe,
} from "./auth.js";

import {
    isLogin,
    getToken,
    getUrlParam,
    computingTime,
    showSwal,
} from "./utility.js";

const showNameInNavbar = () => {
    const navProfile = document.querySelector('.nav__profile');
    const topBarEmail = document.querySelector('.top-bar__email')
    const topBarPhone = document.querySelector('.top-bar__phone');
    const isUserLogin = isLogin();

    if (isUserLogin) {
        navProfile.innerHTML = '';
        getMe()
            .then(data => {
                navProfile.innerHTML = `<span class="nav__profile-text">
                    ${data.name}
                    </span>`;

                topBarEmail.innerHTML = `<a href="#" class="top-bar__email-text top-bar__link">
                    ${data.email}
                    </a>
                    <i class="fas fa-envelope top-bar__email-icon"></i>`;

                topBarPhone.innerHTML = `<a href="#" class="top-bar__phone-text top-bar__link">
                    ${data.phone}
                    </a>
                    <i class="fas fa-phone
                    top-bar__phone-icon"></i>`;
            })
    }
    else {
        navProfile.innerHTML = '';
        topBarEmail.innerHTML = '';
        topBarPhone.innerHTML = '';

        navProfile.innerHTML = `<a href="login.html" class="nav__profile-link">
                ورود
            </a>
                /
            <a href="register.html" class="nav__profile-link">
                ثبت نام
            </a>`;

        topBarEmail.innerHTML = `
            <a href="#" class="top-bar__email-text top-bar__link">sabzlearn@gmail.com</a>
            <i class="fas fa-envelope top-bar__email-icon"></i>`;

        topBarPhone.innerHTML = `
            <a href="#" class="top-bar__phone-text top-bar__link">09123456789</a>
            <i class="fas fa-phone top-bar__phone-icon"></i>`;
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
                        <a href=course.html?name=${course.shortName} class="course-box__logo">
                            <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                        </a>
                        <div class="course-box__main">
                            <a href=course.html?name=${course.shortName} class="course-box__title">
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
                                
                                    ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svgs/star.svg" alt="Rating" class="course-box__star">').join('')}

                                    ${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svgs/star_fill.svg" alt="Rating" class="course-box__star">').join('')}

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
                                    ${course.price ? `${course.price.toLocaleString()} تومان` : "رایگان"}
                                </span>
                            </div>
                        </div>

                        <div class="course-box__footer">
                            <a href=course.html?name=${course.shortName} class="course-box__footer-text">
                                مشاهده اطلاعات
                                <i class="fas fa-arrow-left course-box__footer-icon"></i>
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
                    <a href=course.html?name=${course.shortName} class="course-box__logo">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href=course.html?name=${course.shortName} class="course-box__title">
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
                                ${course.price ? `${course.price.toLocaleString()} تومان` : "رایگان"}
                            </span>
                        </div>
                    </div>

                    <div class="course-box__footer">
                        <a href=course.html?name=${course.shortName} class="course-box__footer-text">
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
                    <a href=course.html?name=${course.shortName} class="course-box__logo">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href=course.html?name=${course.shortName} class="course-box__title">
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
                                ${course.price ? `${course.price.toLocaleString()} تومان` : "رایگان"}
                            </span>
                        </div>
                    </div>

                    <div class="course-box__footer">
                        <a href=course.html?name=${course.shortName} class="course-box__footer-text">
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
                                    <a href="blog.html" class="article-card__logo">
                                        <img src=http://localhost:4000/courses/covers/${article.cover} alt="Articel Cover" class="article-card__img">
                                    </a>
                                </div>

                                <div class="articel-card__content">
                                    <a href="blog.html" class="article-card__title">
                                        ${article.title}
                                    </a>
                                    <p class="article-card__desc">
                                        ${article.description}
                                    </p>
                                    <a href="blog.html" class="article-card__btn">
                                        بیشتر بخوانید
                                    </a>
                                </div>
                            </div>
                        </div>
                `)
            })
        })
}

const getAndShowMenus = () => {
    const navMenu = document.querySelector('.nav__menu');

    fetch('http://localhost:4000/v1/menus')
        .then(res => res.json())
        .then(menus => {
            menus.forEach(menu => {
                navMenu.insertAdjacentHTML('beforeend', `
                <li class="nav__item">
                    <a href="category.html?cat=${menu.href}" class="nav__link">
                        ${menu.title}
                        ${menu.submenus.length ? `<i class="fas fa-angle-up nav__link-icon"></i> 
                        <ul class="nav__sub-menu">
                            ${menu.submenus.map(submenu =>
                    `<li class="nav__sub-item">
                                <a href="#${submenu.href}" class="nav__sub-link">
                                    ${submenu.title}
                                </a>
                            </li>`).join('')}
                        </ul>` : ''}
                    </a>
                </li>
                `)

            })
        })
}

const getAndShowCategoryCourses = async () => {
    const queryParametrLocation = location.search.split('/');
    let categoryCourses = queryParametrLocation[queryParametrLocation.length - 1];

    if (!categoryCourses) {
        categoryCourses = 'frontend';
    }

    // Qeury Params
    // const categoryName = getUrlParam('cat');

    const getCategoryCourses = await fetch(`http://localhost:4000/v1/courses/category/${categoryCourses}`);
    const showCategoryCourses = await getCategoryCourses.json();

    return showCategoryCourses;
}

const insertCourseBoxHtmlTemplate = (courses, showType, parentElement, errorMessage) => {
    parentElement.innerHTML = '';
    if (showType === 'row') {
        if (courses.length) {
            courses.forEach(course => {
                parentElement.insertAdjacentHTML('beforeend', `
            <div class="col-4">
                <div class="course-box">
                    <a href=course.html?name=${course.shortName} class="course-box__logo">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Img" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href=course.html?name=${course.shortName} class="course-box__title">
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
                            ${course.price ? `${course.price.toLocaleString()} تومان` : "رایگان"}
                            </span>
                        </div>
                    </div>
    
                    <div class="course-box__footer">
                        <a href=course.html?name=${course.shortName} class="course-box__footer-text">
                            مشاهده اطلاعات
                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        `)
            })
        }
        else {
            parentElement.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger">
                    ${errorMessage}
                </div>
            `)
        }
    }
    else {
        if (courses.length) {
            courses.forEach(course => {
                parentElement.insertAdjacentHTML('beforeend', `
                    <div class="col-12" id="course-box__wrapper">
                        <div class="course-box">
                            <div class="course__box-header">
                                <div class="course__box-right">
                                    <a class="course__box-right-link" href="#">
                                        <img src=http://localhost:4000/courses/covers/${course.cover} class="course__box-right-img">
                                    </a>
                                </div>
                            
                                <div class="course__box-left">
                                    <div class="course__box-left-top">
                                        <a href="#" class="course__box-left-link">
                                        ${course.name}
                                        </a>
                                        <a href="#" class="course-box__footer-text">
                                            مشاهده اطلاعات
                                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                        </a>
                                    </div>
    
                                    <div class="course__box-left-center">
                                        <div class="course__box-left-teacher">
                                            <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                            <span class="course__box-left-name">
                                            ${course.creator}
                                            </span>
                                        </div>
    
                                        <div class="course__box-left-stars">
                                           ${Array(5 - course.courseAverageScore).fill('').map(() => `<img src="./images/svgs/star.svg" alt="Rating" class="course-box__star">`).join('')}
    
                                            ${Array(course.courseAverageScore).fill(0).map(score => ` <img src="./images/svgs/star_fill.svg" alt="Rating"
                                            class="course-box__star">`).join('')}
    
                                        </div>
                                    </div>
    
                                    <div class="course__box-left-bottom">
                                        <div class="course__box-left-desc">
                                            <p class="course__box-left-desc-text">امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به
                                                قدری
                                                که
                                                حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js
                                                پیاده
                                                سازی
                                                نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند.
                                                پس
                                                شما هم
                                                اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                                                کاربردی
                                                که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                                        </div>
                                    </div>
    
                                    <div class="course__box-footer">
                                        <div class="course__box-footer-right">
                                            <i class="course__box-footer-icon fa fa-users"></i>
                                            <span class="course__box-footer-count">
                                                ${course.registers}
                                            </span>
                                        </div>
                                        <span class="course__box-footer-left">
                                            ${course.price ? `${course.price.toLocaleString()} تومان` : "رایگان"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            })
        } else {
            parentElement.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger">
                    ${errorMessage}
                </div>
            `)
        }
    }
}

const coursesSorting = (array, filterMethod) => {
    let outputArray = [];

    switch (filterMethod) {
        case 'popular':
            outputArray = array.sort((a, b) => b.courseAverageScore - a.courseAverageScore);
            break;

        case 'last':
            outputArray = array;
            break;

        case 'first':
            outputArray = [...array].reverse();
            break;

        case 'free':
            outputArray = array.filter(course => course.price === 0);
            break;

        case 'money':
            outputArray = array.filter(course => course.price !== 0);
            break;

        case 'cheapest':
            outputArray = array.sort((a, b) => a.price - b.price);
            break;

        case 'expensive':
            outputArray = array.sort((a, b) => b.price - a.price);
            break;

        default:
            outputArray = array;
            break;
    }

    return outputArray;
}

const getCourseDetails = () => {
    const shortNameCourse = getUrlParam("name");
    const userToken = getToken();

    // Select Elems From Dom
    const courseInfoLink = document.querySelector('.course-info__link');
    const courseInfoTitle = document.querySelector('.course-info__title');
    const courseInfoDesc = document.querySelector('.course-info__desc');
    const courseInfoVideo = document.querySelector('.course-info__video');
    const courseInfosRegisterText = document.querySelector('.course-infos__register-text');
    const courseBoxesBoxStatus = document.querySelector('#course-boxes__box-status');
    const courseBoxesBoxSupport = document.querySelector('#course-boxes__box-support');
    const courseBoxesBoxUpdated = document.querySelector('#course-boxes__box-updated');
    const courseBoxesBoxTime = document.querySelector('#course-boxes__box-time');
    const courseInfosMoreCommentsCount = document.querySelector('.course-infos__more-comments-count');
    const courseInfosMoreSaleCount = document.querySelector('.course-infos__more-sale-count');
    const collapseWrapper = document.querySelector('#collapseOne');
    const breadcrumbContentGroping = document.querySelector('#breadcrumb__content-groping');
    const breadcrumbContentCourse = document.querySelector('#breadcrumb__content-course');
    const commentsContentWrapper = document.querySelector(
        ".comments__content"
    );


    fetch(`http://localhost:4000/v1/courses/${shortNameCourse}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    })
        .then(res => res.json())
        .then(course => {
            console.log(course);
            breadcrumbContentGroping.innerHTML = `<a href="category.html?cat=/category-info/${course.categoryID.name}" class="breadcrumb__content-link">
                ${course.categoryID.title}
                <i class="fas fa-angle-left breadcrumb__content-link-icon"></i>
            </a>`;
            breadcrumbContentCourse.innerHTML = course.name;

            courseInfoLink.innerHTML = course.categoryID.title;
            courseInfoLink.setAttribute("href", `category.html?cat=/category-info/${course.categoryID.name}`);

            courseInfoTitle.innerHTML = course.name;

            courseInfoVideo.setAttribute("poster", `http://localhost:4000/courses/covers/${course.cover}`);

            courseInfoDesc.innerHTML = course.description;

            document.title = `سبزلرن | ${course.name}`;

            courseInfosRegisterText.insertAdjacentHTML('beforeend',
                course.isUserRegisteredToThisCourse ?
                    'دانشجو دوره هستید' : 'ثبت نام در دوره');

            courseBoxesBoxStatus.innerHTML = course.isComplete ? "در حال برگزاری" : "به اتمام رسیده";
            courseBoxesBoxSupport.innerHTML = course.support;

            const dateUpdating = course.updatedAt.split('T')[0];
            courseBoxesBoxUpdated.innerHTML = dateUpdating;

            let totalTime = computingTime(course.sessions);
            courseBoxesBoxTime.innerHTML = `${totalTime} ساعت`;

            courseInfosMoreCommentsCount.innerHTML = `${course.comments.length} دیدگاه`;

            courseInfosMoreSaleCount.innerHTML = course.courseStudentsCount;

            //! Show Course Sessions 
            if (course.sessions.length) {
                course.sessions.forEach((session, index) => {
                    collapseWrapper.insertAdjacentHTML('beforeend', `
                        <div class="accordion-body course-desc__accordion-body">
                            <div class="course-desc__accordion-right">
                                <div class="course-desc__accordion-count">
                                    <span class="course-desc__accordion-number">
                                        ${index + 1}
                                    </span>
                                </div>
    
                                <i class="fab fa-youtube course-desc__accordion-right-icon"></i>
                                
                            ${(session.free || course.isUserRegisteredToThisCourse) ? `<a href="episode.html?name=${course.shortName}&id=${session._id}" class="course-desc__accordion-link">
                                        ${session.title}
                                </a>` :
                            `<span class="course-desc__accordion-link">
                                        ${session.title}
                            </span>`}    
                            </div>
    
                            <div class="course-desc__accordion-left">
                            ${(session.free || course.isUserRegisteredToThisCourse) ? `<span style="margin-left:23.25px"; class="course-desc__accordion-time">
                                ${session.time}
                            </span>` :
                            `<span class="course-desc__accordion-time">
                                ${session.time}
                            </span>`}

                            ${(session.free || course.isUserRegisteredToThisCourse) ? "" :
                            `<i class="fa-solid fa-lock course-desc__accordion-left-icon"></i>`}
                            </div>
    
                        </div>
                    `)
                })
            }
            else {
                collapseWrapper.insertAdjacentHTML('beforeend', `
                        <div class="accordion-body course-desc__accordion-body">
                            <div class="course-desc__accordion-right">
                                <div class="course-desc__accordion-count">
                                    <span class="course-desc__accordion-number">
                                        -
                                    </span>
                                </div>
    
                                <i class="fab fa-youtube course-desc__accordion-right-icon"></i>
    
                                <a href="#" class="course-desc__accordion-link">
                                    هنوز جلسه ای آپلود نشده
                                </a>
                            </div>
    
                            <div class="course-desc__accordion-left">
                                <span class="course-desc__accordion-time">
                                    -
                                </span>
                            </div>
    
                        </div>
                    `)
            }


            //! Show Course Comments
            if (course.comments.length) {

                course.comments.forEach(comment => {
                    commentsContentWrapper.insertAdjacentHTML('beforeend', `
                <div class="comments__item">
                    <div class="comments__question">
                        <div class="comments__question-header">
                            <div class="comments__question-header-right">
                                <span class="comments__question-name comment-name">
                                    ${comment.creator.name}
                                </span>
                                
                                <span class="comments__question-status comment-status">
                                    ${comment.creator.role === 'USER' ? "دانشجو" : "مدرس"}
                                </span>

                                <span class="comments__question-date comment-date">
                                ${comment.createdAt.slice(0, 10)}
                                </span>
                            </div>

                            <div class="comments__question-header-left">
                                <a class="comments__question-header-link comment-link" href="#">
                                    پاسخ
                                </a>
                            </div>
                        </div>

                        <div class="comments__question-text">
                            <p class="comments__question-paragraph comment-paragraph">
                                ${comment.body}
                            </p>
                        </div>
                    </div>

                    ${comment.answerContent ?
                            `<div class="comments__ansewr">
                            <div class="comments__ansewr-header">
                                <div class="comments__ansewr-header-right">
                                    <span class="comments__ansewr-name comment-name">
                                        ${comment.answerContent.creator.name}
                                    </span>

                                    <span class="comments__ansewr-staus comment-status">
                                      ${comment.answerContent.creator.role === 'USER' ? "دانشجو" : "مدرس"}
                                    </span>

                                    <span class="comments__ansewr-date comment-date">
                                        1401/04/21
                                    </span>
                                </div>

                                <div class="comments__ansewr-header-left">
                                    <a class="comments__ansewr-header-link comment-link" href="#">
                                        پاسخ
                                    </a>
                                </div>
                            </div>
                            <div class="comments__ansewr-text">
                                <p class="comments__ansewr-paragraph comment-paragraph">
                                  ${comment.answerContent.body}
                                </p>
                            </div>
                        </div>` : ''}
                </div>`)
                })
            }
            else {
                commentsContentWrapper.insertAdjacentHTML('beforeend', `<div class="alert alert-danger">
                    هنوز هیچ کامنتی برای این دوره ثبت نشده است
                </div>`)
            }
        })
}

const getAndShowRelatedCourses = () => {
    const shortNameCourse = getUrlParam("name");

    // Select Elems From DOM
    const courseInfoRelatedCourseList = document.querySelector('.course-info__related-course-list');


    fetch(`http://localhost:4000/v1/courses/related/${shortNameCourse}`)
        .then(res => res.json())
        .then(relatedCourses => {
            courseInfoRelatedCourseList.innerHTML = "";

            if (relatedCourses.length) {
                relatedCourses.forEach(course => {
                    courseInfoRelatedCourseList.insertAdjacentHTML('beforeend', `
                        <li class="course-info__related-course-item">
                            <a href="course.html?name=${course.shortName} " class="course-info__related-course-link">
                                <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Related"
                                class="course-info__related-course-img">
                    
                                <span class="course-info__related-course-text">
                                ${course.name}
                                </span>
                            </a>
                        </li>
                    `)
                })

            }
            else {
                courseInfoRelatedCourseList.insertAdjacentHTML('beforeend', `
                    <p class="course-info__related-course-desc__null">هیج دوره مرتبطی با این دوره وجود ندارد</p>
                    `)
            }
        })
}

const getAndShowOneSessionCourse = async () => {
    const shortNameCourse = getUrlParam("name");
    const shortIDCourse = getUrlParam("id");
    const userToken = getToken();

    // Select Elems From DOM
    const episodeContentVideo = document.querySelector('.episode-content__video');
    const sidebarTopicsList = document.querySelector('.sidebar-topics__list');
    const episodeHeaderLeftText = document.querySelector('.episode-header__left-text');

    const res = await fetch(`http://localhost:4000/v1/courses/${shortNameCourse}/${shortIDCourse}`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    });
    const episode = await res.json();

    episodeContentVideo.setAttribute('src', `http://localhost:4000/courses/covers/${episode.session.video}`);
    episodeHeaderLeftText.innerHTML = episode.session.title;

    sidebarTopicsList.innerHTML = "";
    episode.sessions.forEach(session => {
        sidebarTopicsList.insertAdjacentHTML('beforeend', `
        <li class="sidebar-topics__list-item">
            <div class="sidebar-topics__list-right">
                <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>

                ${session.free ? `<a href="episode.html?name=${shortNameCourse}&id=${session._id}" class="sidebar-topics__list-item-link">
                    ${session.title}
                </a>` : `
                <span class="sidebar-topics__list-item-title">
                    ${session.title}
                </span>`}
                
            </div>
            <div class="sidebar-topics__list-left">
            ${session.free ? `<span class="sidebar-topics__list-item-time" style="padding-left:19px";>
                ${session.time}
            </span>` : `<span class="sidebar-topics__list-item-time">
                ${session.time}
            </span>`}
                
                ${session.free ? "" : `<i class="fa-solid fa-lock sidebar-topics__list-left-icon"></i>`}
            </div>
        </li>
    `)
    })

    const sidebarTopicsListItems = document.querySelectorAll('.sidebar-topics__list-item');

    sidebarTopicsListItems.forEach(item => {
        let textItem = item.firstElementChild.lastElementChild.innerText;

        if (episode.session.title === textItem) {
            sidebarTopicsListItems.forEach(item => item.classList.remove('sidebar-topics__list-item--active'));

            item.classList.add('sidebar-topics__list-item--active');
        }
    })

    return episode;
}

const submitContactUsMessage = () => {

    // Select Elems From DOM
    const loginFormUsernameInput = document.querySelector('.login-form__username-input');
    const loginFormEmailInput = document.querySelector('.login-form__email-input');
    const loginFormPhoneInput = document.querySelector('.login-form__phone-input');
    const loginFormTextInput = document.querySelector('.login-form__text-input');
    const loginFormBtn = document.querySelector('.login-form__btn');

    loginFormBtn.addEventListener('click', event => {
        event.preventDefault();

        let newContactUsBody = {
            name: loginFormUsernameInput.value.trim(),
            email: loginFormEmailInput.value.trim(),
            phone: loginFormPhoneInput.value.trim(),
            body: loginFormTextInput.value.trim(),
        }

        fetch(`http://localhost:4000/v1/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContactUsBody)
        })
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    showSwal(
                        'success',
                        'پیغام شما با موفقیت ارسال شد',
                        'ورود به پنل',
                        () => { });
                    clearInputs();
                }
                else {
                    showSwal(
                        'error',
                        'مشکلی در ارسال پیام وجود دارد \n لطفا بعدا امتحان کنید',
                        'ای بابا !',
                        () => { });
                }
            })
    })

    function clearInputs() {
        loginFormEmailInput.value = "";
        loginFormPhoneInput.value = "";
        loginFormTextInput.value = "";
        loginFormBtn.value = "";
    }
}

const joinNewsLetters = async () => {

    // Select Elems From DOM
    const footerNewsLetterInput = document.querySelector('.footer-news-letter__input');

    const emailNewsLetterObj = {
        email: footerNewsLetterInput.value.trim()
    };

    let res = await fetch('http://localhost:4000/v1/newsletters', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(emailNewsLetterObj),
    })

    if (res.status === 201) {
        footerNewsLetterInput.value = "";
        showSwal(
            'success',
            'با موفقیت در خبرنامه عضو شدید',
            'دمت گرم',
            () => { });
    }
    else {
        showSwal(
            'error',
            'لطفا ایمیل رو به درستی وارد کنید',
            'ای بابا !',
            () => { });
    }

    return res;
}

export {
    showNameInNavbar,
    renderTopbarMenus,
    getAndShowAllCourses,
    getAndShowPopularCourses,
    getAndShowPreSellCourses,
    getAndShowArticles,
    getAndShowMenus,
    getAndShowCategoryCourses,
    insertCourseBoxHtmlTemplate,
    coursesSorting,
    getCourseDetails,
    getAndShowRelatedCourses,
    getAndShowOneSessionCourse,
    submitContactUsMessage,
    joinNewsLetters,
}