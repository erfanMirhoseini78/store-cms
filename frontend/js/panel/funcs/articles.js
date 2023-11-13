import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const categoryList = document.querySelector('.category-list');
const fileElem = document.getElementById('file');
const titleElem = document.querySelector('#title');
const linkElem = document.querySelector('#link');
const summaryElem = document.querySelector('#summary');
const editorElem = document.querySelector('#editor');

let categoryID = '-1';
let coverArticle = null;
let articleBodyEditor = null;

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

const prepareCreateNewArticles = async () => {
    // CKEditor
    ClassicEditor
        .create(document.querySelector('#editor'), {
            placeholder: 'محتوای مقاله را وارد کنید ... !',
            language: 'fa',
        })
        .then(result => {
            articleBodyEditor = result;
        })
        .catch(error => {
            console.error(error);
        });

    const res = await fetch(`http://localhost:4000/v1/category`);
    const categories = await res.json();

    categories.forEach(category => {
        categoryList.insertAdjacentHTML('beforeend', `
            <option value="${category._id}">
                ${category.title}
            </option>
        `)
    })

    categoryList.addEventListener('change', event => categoryID = event.target.value);
    fileElem.addEventListener('change', event => coverArticle = event.target.files[0]);
}

const createNewArticle = async () => {
    const adminToken = getToken();

    let formDate = new FormData();

    formDate.append('title', titleElem.value.trim());
    formDate.append('description', summaryElem.value.trim());
    formDate.append('body', articleBodyEditor.getData());
    formDate.append('shortName', linkElem.value.trim());
    formDate.append('categoryID', categoryID);
    formDate.append('cover', coverArticle);

    const res = await fetch('http://localhost:4000/v1/articles', {
        method: "POST",
        headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
        },
        body: formDate
    })
    const result = await res.json();

    if (res.status === 201) {
        showSwal(
            'success',
            'مقاله با موفقیت ایجاد شد',
            'ایول',
            () => {
                titleElem.value = "";
                summaryElem.value = "";
                linkElem.value = "";
                articleBodyEditor.setData('');
                fileElem.value = "";
                categoryList.value = '-1';
                getAndShowArticles();
            }
        )
    }
    else {
        showSwal(
            'error',
            'در ایجاد مقاله مشکلی به وجود آمده است',
            'درستش میکنیم',
            () => { }
        )
    }

    return result;
}

export {
    getAndShowArticles,
    removeArticle,
    createNewArticle,
    prepareCreateNewArticles,
}