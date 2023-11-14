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
                    ${discount.percent}
                </td>
                <td>
                    ${discount.updatedAt.slice(0, 10)}
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

const removeDiscount = async discountID => {
    console.log(discountID);
}

export {
    getAndShowDiscounts,
    removeDiscount,
}