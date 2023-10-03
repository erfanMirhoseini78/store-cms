const swiper = new Swiper('.swiper', {
    speed: 800,
    loop: true,

    breakpoints: {
        600: {
            slidesPerView: 1,
        },
        900: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
})