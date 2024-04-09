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
const filters__checkbox_inputs = document.querySelectorAll(".filters__checkbox_input");
let parameters = {};
filters__show_items.href = window.location.href;

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
function UrlPriceChange(parameter_value_price_from, parameter_value_price_to) {
    const parameter_url = `price_from=${parameter_value_price_from}&price_to=${parameter_value_price_to}`.replace(/ /g, "%20");

    let url = window.location.href;

    if (url.indexOf('?') > -1) {
        url += `&${parameter_url}`
    } else {
        url += `?${parameter_url}`
    }

    window.location.href = url;
}

function priceChange() {
    const irs_from = document.querySelector(".irs-from");
    const irs_to = document.querySelector(".irs-to");
    let parameter_value_price_from;
    let parameter_value_price_to;

    // TODO: реализовать брание из параметров запроса данных для блока Цены

    irs_from.addEventListener('DOMSubtreeModified', function () {
        filters__range_slider_min__number.textContent = irs_from.textContent;
        parameter_value_price_to = encodeURIComponent(irs_to.textContent);
        parameter_value_price_from = encodeURIComponent(irs_from.textContent);
        UrlPriceChange(parameter_value_price_from, parameter_value_price_to);
    });

    irs_to.addEventListener('DOMSubtreeModified', function () {
        filters__range_slider_max__number.textContent = irs_to.textContent;
        parameter_value_price_to = encodeURIComponent(irs_to.textContent);
        parameter_value_price_from = encodeURIComponent(irs_from.textContent);
        UrlPriceChange(parameter_value_price_from, parameter_value_price_to);
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


/* Если в адресной строке есть параметры, то фильтры расставляются в зависимости от значений параметров */
for (let filter of filters__checkbox_inputs) {
    const parameter = filter.parentNode.parentNode.parentNode.getAttribute("data-filter");
    const parameter_value = encodeURIComponent(filter.getAttribute("value"));
    let url = window.location.href;

    if (url.indexOf(parameter) >= 0) {

        if (url.lastIndexOf(url.indexOf(parameter), "&") == -1) {
            past_parameter = url.slice(url.indexOf(parameter), url.length).split("=")[1];
        } else {
            past_parameter = url.slice(url.indexOf(parameter), url.lastIndexOf(url.indexOf(parameter), "&")).split("=")[1];
        }

        past_parameter = past_parameter.split(",");
        for (let parameter of past_parameter) {
            if (parameter == parameter_value) {
                filter.click();
            }
        }

    }
};

/* События для определения того, что юзер нажал на инпут с фильтром */
for (let filter of filters__checkbox_inputs) {
    filter.addEventListener("change", () => {
        const parameter = filter.parentNode.parentNode.parentNode.getAttribute("data-filter");
        const parameter_value = encodeURIComponent(filter.getAttribute("value"));

        parameters[parameter] = parameter_value;
        //const parameter_url = `${parameter}=${parameter_value}`.replace(/ /g, "%20");

        for (let parameter of parameters) {

        }
        let url = filters__show_items.href;
        console.log(url)

        // url = new URL("http://127.0.0.1:5500/VW-SPB-Catalog/?model=ID.4")

        // if (url.indexOf(parameter) >= 0) {

        //     if (url.lastIndexOf(url.indexOf(parameter), "&") == -1) {
        //         past_parameter = url.slice(url.indexOf(parameter), url.length);
        //     } else {
        //         past_parameter = url.slice(url.indexOf(parameter), url.lastIndexOf(url.indexOf(parameter), "&"));
        //     }

        //     if (past_parameter.indexOf(parameter_value) >= 0) {
        //         url = url.replace(past_parameter, past_parameter.replace(parameter_value, "").replace(/,\s*$/, ""))
        //     } else {
        //         url = url.replace(past_parameter, past_parameter + "," + parameter_value)
        //     }


        //     if (url[0] == "&") {
        //         url = "?" + url;
        //     }

        // } else {

        //     if (url.indexOf('?') > -1) {
        //         url += `&${parameter_url}`
        //     } else {
        //         url += `?${parameter_url}`
        //     }
        // }

        // window.location.href = url;
        if (url.searchParams.has(parameter)) {
            let new_parameter = `${url.searchParams.get(parameter)},${parameter_value}`
            console.log(new_parameter)
            url.searchParams.set(parameter, new_parameter)
        } else {
            url.searchParams.set(parameter, parameter_value)
        }

        console.log(url)

        //window.location.href = url;
    })
};