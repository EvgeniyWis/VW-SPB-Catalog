/* Объявление глобальных переменных */
const navbar__adaptive_menuBurger = document.getElementById("navbar__adaptive_menuBurger");
const navbar__adaptive_menu = document.getElementById("navbar__adaptive_menu");
const navbar__adaptive_menu_cross = document.getElementById("navbar__adaptive_menu_cross");
const filters__range_slider_min__number = document.getElementById("filters__range_slider_min__number");
const filters__range_slider_max__number = document.getElementById("filters__range_slider_max__number");

/* Открытие и закрытие бургер меню */
navbar__adaptive_menuBurger.addEventListener("click", () => {
    navbar__adaptive_menu.classList.toggle("navbar__adaptive--active");
    popup__background.classList.add("popup__background__active");
})

navbar__adaptive_menu_cross.addEventListener("click", () => {
    navbar__adaptive_menu.classList.remove("navbar__adaptive--active");
    popup__background.classList.remove("popup__background__active");
})

/* Функционал слайдера в блоке "Цена" */
$(".filters__range_slider_input").ionRangeSlider({
    type: "double",
    min: 3650000,
    max: 6745000,
});

document.addEventListener("DOMContentLoaded", () => {
    const irs_from = document.querySelector(".irs-from");
    const irs_to = document.querySelector(".irs-to");

    irs_from.addEventListener('DOMSubtreeModified', function () {
        filters__range_slider_min__number.textContent = irs_from.textContent;
    });

    irs_to.addEventListener('DOMSubtreeModified', function () {
        filters__range_slider_max__number.textContent = irs_to.textContent;
    });
});

/* Функционал нажатия на цвета в блоке "Цвет" */
const filters__colors__items = document.querySelectorAll(".filters__colors--item");

for (let item of filters__colors__items) {
    item.addEventListener("click", () => {
        item.classList.toggle("filters__colors--item--active");
    })
}