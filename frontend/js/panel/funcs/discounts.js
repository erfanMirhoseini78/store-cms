import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const getAndShowDiscounts = async () => {
    const adminToken = getToken();

    const tableBodyWrapper = document.querySelector('.table-body__wrapper');

    const res = await fetch('http://localhost:4000/v1/offs', {
        headers: {
            Authorization: `Bearer ${adminToken}`
        }
    });
    const discounts = await res.json();

    tableBodyWrapper.innerHTML = "";
    discounts.forEach((discount, index) => {
        tableBodyWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${discount.code}
                </td>
                <td>
                    ${discount.creator}
                </td>
                <td>
                    ${discount.percent}%
                </td>
                <td>
                    ${discount.max}
                </td>
                <td>
                    ${discount.uses}
                </td>
                <td>
                    ${discount.createdAt.slice(0, 10)}
                </td>
                <td>
                    <button type='button' class='btn btn-primary delete-btn' onclick=answerDiscount(${JSON.stringify(discount._id)})>پاسخ</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick=removeDiscount(${JSON.stringify(discount._id)})>حذف</button>
                </td>
            </tr>
        `)
    })

    return discounts;
}

const coursesSelect = document.querySelector('#courses-select');
const codeElem = document.querySelector('#code');
const percentElem = document.querySelector('#percent');
const timeElem = document.querySelector('#time');

let courseID = '-1';

const prepareCreateNewDiscount = async () => {
    const res = await fetch('http://localhost:4000/v1/courses');
    const courses = await res.json();

    courses.forEach(course => {
        coursesSelect.insertAdjacentHTML('beforeend', `
            <option value="${course._id}">
                ${course.name}
            </option>
        `)
    })

    coursesSelect.addEventListener('change', event => courseID = event.target.value);
}

const createNewDiscount = async () => {
    const adminToken = getToken();

    const newDiscountInfos = {
        code: codeElem.value.trim(),
        percent: percentElem.value.trim(),
        course: courseID,
        max: +timeElem.value.trim()
    }

    const res = await fetch('http://localhost:4000/v1/offs', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(newDiscountInfos)
    })
    const result = await res.json();

    if (res.status === 201) {
        showSwal(
            'success',
            'کد تخفیف با موفقیت ایجاد شد',
            'خدارو شکر',
            () => {
                coursesSelect.value = '-1';
                codeElem.value = "";
                percentElem.value = "";
                timeElem.value = "";
                getAndShowDiscounts();
            }
        )
    }
    else {
        showSwal(
            'error',
            'در ایجاد کد تخفیف مشکلی به وجود آمده است',
            'حلش میکنیم',
            () => { }
        )
    }

    return result;
}

const removeDiscount = async discountID => {
    console.log(discountID);
}

export {
    getAndShowDiscounts,
    removeDiscount,
    prepareCreateNewDiscount,
    createNewDiscount,
}