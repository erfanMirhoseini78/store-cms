import {
    getToken,
    showSwal,
} from "../../funcs/utility.js";

const setCampaign = async () => {
    const adminToken = getToken();

    const campaignPercentInput = document.querySelector('#campaign-percent-input');

    const newCampaignInfos = {
        discount: campaignPercentInput.value.trim()
    }

    const res = await fetch('http://localhost:4000/v1/offs/all', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(newCampaignInfos)
    })
    const result = await res.json();

    if (res.ok) {
        showSwal(
            'success',
            'کمپین جدید با موفقیت ساخته شد',
            'ایولاااا',
            () => {
                campaignPercentInput.value = "";
            }
        )
    } else {
        showSwal(
            'error',
            'در ایجاد کمپین جدید مشکلی رخ داده است',
            'عیب نداره',
            () => { }
        )
    }

    return result;
}

export {
    setCampaign,
}