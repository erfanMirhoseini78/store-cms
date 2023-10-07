const landingTitle = document.querySelector('.landing__title');
const landingCourseCount = document.querySelector('#landing-courses__count');
const landingLearnMinutes = document.querySelector('#landing-learn__minutes');
const landingUserCount = document.querySelector('#landing-user__count');

window.addEventListener('load', () => {
    const landingText = 'ما به هر قیمتی دوره آموزشی تولید نمیکنیم !';
    let typeIndex = 0;

    typeWriter(landingText, typeIndex);
    makeCounter(40, landingCourseCount);
    makeCounter(3_320, landingLearnMinutes);
    makeCounter(3_071, landingUserCount);
})

function typeWriter(text, index) {
    if (index < text.length) {
        landingTitle.innerHTML += text[index];
        index++;
    }

    setTimeout(() => {
        typeWriter(text, index);
    }, 100)
}

function makeCounter(max, elem) {
    let counter = 0;
    const interval = setInterval(() => {
        if (counter === max) {
            clearInterval(interval)
        }
        elem.innerHTML = counter;
        counter++;

    }, .001)
}