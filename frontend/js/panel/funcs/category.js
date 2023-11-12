import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const getAndShowCategories = () => {
    const tableBody = document.querySelector('.table-body__wrapper');

    fetch('http://localhost:4000/v1/category')
        .then(res => res.json())
        .then(categories => {
            tableBody.innerHTML = "";
            categories.forEach((category, index) => {
                tableBody.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>
                            ${index + 1}
                        </td>
                        <td>
                            ${category.title}
                        </td>
                        <td>
                            ${category.name}
                        </td>
                        <td>
                            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                        </td>
                        <td>
                            <button type='button' class='btn btn-danger delete-btn' onclick=removeCategory(${JSON.stringify(category._id)})>حذف</button>
                        </td>
                    </tr>
                `)
            })
        })
}

const removeCategory = categoryID => {
    showSwal(
        'question',
        'مطمئن هستید که دسته بندی مورد نظر حذف شود؟',
        'اره خیالت راحت',
        result => {
            getAndShowCategories();

            const adminToken = getToken();
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${adminToken}`
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            showSwal(
                                'success',
                                'دسته بندی مورد نظر با موفقیت حذف شد',
                                'همه چی اوکیه',
                                () => {
                                    getAndShowCategories();
                                }
                            )
                        }
                        else {
                            showSwal(
                                'error',
                                'دسته بندی مورد نظر برای حذف با خطا مواجه شده',
                                'یه جای کار میلنگه',
                                () => { }
                            )
                        }
                    })
            }
        }
    )
}

const createCategory = async () => {
    const adminToken = getToken();

    const titleElem = document.querySelector('#title');
    const nameElem = document.querySelector('#name');

    const newCategoryInfos = {
        title: titleElem.value.trim(),
        name: nameElem.value.trim(),
    }

    const res = await fetch(`http://localhost:4000/v1/category`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategoryInfos),
    })

    if (res.status === 201) {
        showSwal('success',
            'دسته بندی جدید با موفقیت ایجاد شد',
            'خیلی هم عالی',
            () => {
                clearInputRegister();
                getAndShowCategories();
            })
    }
    else if (res.status === 400 || res.status === 401) {
        showSwal(
            'error',
            'اطلاعات را به درستی وارد کنید',
            'تصحیح اطلاعات',
            () => { }
        )
    }

    const result = await res.json();

    function clearInputRegister() {
        titleElem.value = "";
        nameElem.value = "";
    }

    return result;
}

export {
    getAndShowCategories,
    removeCategory,
    createCategory,
}