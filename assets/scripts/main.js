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

    let url = filters__show_items.href;

    if (url.indexOf('?') > -1) {
        url += `&${parameter_url}`
    } else {
        url += `?${parameter_url}`
    }

    window.location.href = filters__show_items.href;
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
    const parameter = filter.parentNode.parentNode.parentNode.id.split("--")[1];
    // const parameter_value = encodeURIComponent(filter.getAttribute("value"));
    // const parameter_url = `${parameter}=${parameter_value}`.replace(/ /g, "%20");
    let url = filters__show_items.href;

    // Получаем часть URL после знака вопроса (включительно), содержащую параметры запроса
    var queryString = url.split('?')[1];

    if (queryString) {
        // Разбиваем строку параметров запроса на массив, используя символ "&" как разделитель
        var queryParams = queryString.split('&');

        // Создаем объект для хранения параметров
        var params = {};

        // Проходим по массиву параметров запроса
        queryParams.forEach(function (query) {
            // Разбиваем каждый параметр на ключ и значение, используя символ "=" как разделитель
            var pair = query.split('=');
            var key = decodeURIComponent(pair[0]); // декодируем ключ
            var value = decodeURIComponent(pair[1]); // декодируем значение
            // Если ключ уже существует, добавляем значение к массиву
            if (params[key]) {
                params[key].push(value);
            } else {
                // Если ключа еще нет, создаем новый массив с этим значением
                params[key] = [value];
            }
        });


        for (let param in params) {
            let filter_params = params[param][0].split(",");

            for (let filter_param of filter_params) {
                if (filter.value == filter_param && parameter == param) {
                    filter.click();
                }
            }
        }
    }
};

/* События для определения того, что юзер нажал на инпут с фильтром */
for (let filter of filters__checkbox_inputs) {
    filter.addEventListener("change", () => {
        const parameter = filter.parentNode.parentNode.parentNode.id.split("--")[1];
        const parameter_value = encodeURIComponent(filter.getAttribute("value"));
        const parameter_url = `${parameter}=${parameter_value}`.replace(/ /g, "%20");

        let url = filters__show_items.href;

        if (url.indexOf(parameter_value) >= 0) {
            url = url.replace(`${parameter_value}`, "").replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
            filters__show_items.href = url;

        } else {
            if (url.indexOf('?') > -1) {
                url += `&${parameter_url}`
            } else {
                url += `?${parameter_url}`
            }
        }

        // Получаем часть URL до знака вопроса (включительно)
        var baseUrl = url.split('?')[0];

        // Получаем параметры запроса после знака вопроса
        var params = url.split('?')[1];

        // Разделяем параметры запроса на массив
        var paramsArray = params.split('&');

        // Объявляем объект для хранения параметров
        var paramsObject = {};

        // Проходим по массиву параметров
        paramsArray.forEach(function (param) {
            var parts = param.split('=');
            var key = parts[0];
            var value = parts[1];
            // Если ключ уже есть в объекте, добавляем значение через запятую
            if (paramsObject.hasOwnProperty(key)) {
                paramsObject[key] += ',' + value;
            } else {
                paramsObject[key] = value;
            }
        });

        // Собираем строку параметров запроса
        var newParams = Object.entries(paramsObject).map(function (entry) {
            return entry.join('=');
        }).join('&');

        // Формируем новый URL
        var newUrl = baseUrl + '?' + newParams;

        filters__show_items.href = newUrl;
    })
};