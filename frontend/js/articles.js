import {
    insertArticleBoxHtmlTemplate,
    showAllArticlesInArticlesPage,
} from "./funcs/shared.js";

import {
    paginateItems,
    getUrlParam,
    addParamToUrl,
} from "./funcs/utility.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener('load', () => {
    showAllArticlesInArticlesPage()
        .then(article => {
            //! Pagination
            const coursesPaginationList = document.querySelector('.courses-pagination__list');
            const articleWrapper = document.querySelector('#article__container');

            let articlesShowType = 'row';
            const currentPage = getUrlParam('page');
            const showArticles = paginateItems([...article], 3, coursesPaginationList, currentPage);

            insertArticleBoxHtmlTemplate([...showArticles], articlesShowType, articleWrapper, "هیچ دوره‌ای برای این دسته بندی وجود ندارد :/");
        });

})