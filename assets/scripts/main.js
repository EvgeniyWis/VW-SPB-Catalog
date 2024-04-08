/* Объявление глобальных переменных */
const navbar__adaptive_menuBurger = document.getElementById("navbar__adaptive_menuBurger");
const navbar__adaptive_menu = document.getElementById("navbar__adaptive_menu");
const navbar__adaptive_menu_cross = document.getElementById("navbar__adaptive_menu_cross");
const filters__range_slider_min__number = document.getElementById("filters__range_slider_min__number");
const filters__range_slider_max__number = document.getElementById("filters__range_slider_max__number");
const catalog_filters = document.getElementById("catalog_filters");
const filters = document.getElementById("filters");
const catalog_wrapper = document.getElementById("catalog_wrapper");
const filters__header__close = document.getElementById("filters__header__close");
const filters__header__delete = document.getElementById("filters__header__delete");
const filters__show_items = document.getElementById("filters__show_items");

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

/* Функционал изменения текста в фильтрах в блоке "Цена" */
function priceChange() {
    const irs_from = document.querySelector(".irs-from");
    const irs_to = document.querySelector(".irs-to");

    irs_from.addEventListener('DOMSubtreeModified', function () {
        filters__range_slider_min__number.textContent = irs_from.textContent;
    });

    irs_to.addEventListener('DOMSubtreeModified', function () {
        filters__range_slider_max__number.textContent = irs_to.textContent;
    });
}
if (document.readyState !== 'loading') {
    priceChange()
} else {
    document.addEventListener("DOMContentLoaded", () => {
        priceChange()
    })
}


/* Функционал нажатия на цвета в блоке "Цвет" */
const filters__colors__items = document.querySelectorAll(".filters__colors--item");

for (let item of filters__colors__items) {
    item.addEventListener("click", () => {
        item.classList.toggle("filters__colors--item--active");
    })
}

/* Открытие адаптивного блока "Фильтры" */
catalog_filters.addEventListener("click", () => {
    if (filters.style.display == "none" || !filters.style.display) {
        filters.style.display = "flex";
        catalog_wrapper.classList.add("hidden");
        filters__show_items.classList.remove("hidden");
    }
    else {
        filters.style.display = "none";
        catalog_wrapper.classList.remove("hidden");
    }
});

/* Закрытие адаптивного блока "Фильтры" */
filters__header__close.addEventListener("click", () => {
    if (filters.style.display == "flex") {
        filters.style.display = "none";
        catalog_wrapper.classList.remove("hidden");
    }
    else {
        filters.style.display = "flex";
        catalog_wrapper.classList.add("hidden");
    }
});

/* Открытие товаров */
filters__show_items.addEventListener("click", () => {
    filters__show_items.classList.add("hidden");
    catalog_wrapper.classList.remove("hidden");
})