import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const getAndShowArticles = async () => {
    const adminToken = getToken();

    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch(`http://localhost:4000/v1/articles`, {
        headers: {
            Authorization: `Bearer ${adminToken}`
        }
    })
    const articles = await res.json();

    tableBodyWrapper.innerHTML = "";
    articles.forEach((article, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${article.title}
                </td>
                <td>
                    ${article.publish ? 'منتشر شده' : 'پیش نویس'}
                </td>
                <td>
                    ${article.createdAt.slice(0, 10)}
                </td>
                <td>
                    ${article.creator.name}
                </td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn' onclick=editArticle(${JSON.stringify(article._id)})>ویرایش</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick=removeArticle(${JSON.stringify(article._id)})>حذف</button>
                </td>
            </tr>
        `)
    })

    return articles;
}

const removeArticle = articleID => {
    console.log(articleID);
}

export {
    getAndShowArticles,
    removeArticle,
}