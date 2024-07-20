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
const filters__colors__items = document.querySelectorAll(".filters__colors--item");
const catalog__filters = document.getElementById("catalog__filters");
const catalog__filters__sort = document.getElementById("catalog__filters__sort");
const popup__background = document.getElementById("popup__background");
let irs_from;
let irs_to;
filters__show_items.href = window.location.href;
filters__header__delete.href = location.protocol + '//' + location.host + location.pathname;


/* Открытие и закрытие бургер меню */
navbar__adaptive_menuBurger.addEventListener("click", () => {
    navbar__adaptive_menu.classList.toggle("navbar__adaptive--active");
    popup__background.classList.add("popup__background__active");
})

navbar__adaptive_menu_cross.addEventListener("click", () => {
    navbar__adaptive_menu.classList.remove("navbar__adaptive--active");
    popup__background.classList.remove("popup__background__active");
})

// for (let item of filters__colors__items) {
//     item.addEventListener("click", () => {
//         item.classList.toggle("filters__colors--item--active");

//         const parameter = "color";
//         const parameter_value = item.getAttribute("data-color");
//         const parameter_url = `${parameter}=${parameter_value}`.replace(/ /g, "%20");

//         let url = filters__show_items.href;

//         if (url.indexOf(parameter_value) >= 0) {
//             console.log(parameter_value);
//             url = url.replace(`${parameter_value}`, "");
//             console.log(url)

//             search_url = new URL(url);

//             if (search_url.searchParams.has(parameter) && !search_url.searchParams.get(parameter).replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")) {
//                 search_url.searchParams.delete(parameter);
//             }

//             filters__show_items.href = search_url;
//             return

//         } else {
//             if (url.indexOf('?') > -1) {
//                 url += `&${parameter_url}`
//             } else {
//                 url += `?${parameter_url}`
//             }
//         }

//         // Получаем часть URL до знака вопроса (включительно)
//         var baseUrl = url.split('?')[0];

//         // Получаем параметры запроса после знака вопроса
//         var params = url.split('?')[1];

//         // Разделяем параметры запроса на массив
//         var paramsArray = params.split('&');

//         // Объявляем объект для хранения параметров
//         var paramsObject = {};

//         // Проходим по массиву параметров
//         paramsArray.forEach(function (param) {
//             var parts = param.split('=');
//             var key = parts[0];
//             var value = parts[1];
//             // Если ключ уже есть в объекте, добавляем значение через запятую
//             if (paramsObject.hasOwnProperty(key)) {
//                 paramsObject[key] += ',' + value;
//             } else {
//                 paramsObject[key] = value;
//             }
//         });

//         // Собираем строку параметров запроса
//         var newParams = Object.entries(paramsObject).map(function (entry) {
//             return entry.join('=');
//         }).join('&');

//         // Формируем новый URL
//         var newUrl = baseUrl + '?' + newParams;

//         filters__show_items.href = newUrl;

//     })
// }

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
let filters_parameters = [];
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

    // Для сортировки
    search_url = new URL(url);
    if (search_url.searchParams.has("sort")) {
        sort = search_url.searchParams.get("sort");
        catalog__filters__sort.value = decodeURIComponent(sort);
    }

    // Для цены
    if (search_url.searchParams.has("cost")) {
        prices = search_url.searchParams.get("cost").split(",");
        filters__range_slider_min__number.textContent = prices[0];
        filters__range_slider_max__number.textContent = prices[1];

        /* Функционал слайдера в блоке "Цена" */
        $(".filters__range_slider_input").ionRangeSlider({
            type: "double",
            min: 3650000,
            max: 6745000,
            from: filters__range_slider_min__number.textContent,
            to: filters__range_slider_max__number.textContent
        });

    } else {
        $(".filters__range_slider_input").ionRangeSlider({
            type: "double",
            min: 3650000,
            max: 6745000
        });
    }

    /* Функционал изменения текста в фильтрах в блоке "Цена" */
    function UrlPriceChange(parameter_value_price_from, parameter_value_price_to) {

        const parameter_url = `cost=${parameter_value_price_from},${parameter_value_price_to}`;

        let url = filters__show_items.href;

        if (url.indexOf("cost") >= 0) {
            url = url.replace(/(cost=)[^&]*/, parameter_url);
            filters__show_items.href = url.replace("%2C", ",");
            return
        }

        if (url.indexOf('?') !== -1) {
            // Если есть, добавляем новый параметр через "&"
            url += '&' + parameter_url;
        } else {
            // Если нет, добавляем новый параметр через "?"
            url += '?' + parameter_url;
        }


        filters__show_items.href = url.replace("%2C", ",");
    }

    function priceChange() {

        irs_from = document.querySelector(".irs-from");
        irs_to = document.querySelector(".irs-to");

        irs_from.addEventListener('DOMSubtreeModified', function () {
            filters__range_slider_min__number.textContent = irs_from.textContent;
            parameter_value_price_to = parseInt(irs_to.textContent.replace(/\s/g, ''), 10);
            parameter_value_price_from = parseInt(irs_from.textContent.replace(/\s/g, ''), 10);
            UrlPriceChange(parameter_value_price_from, parameter_value_price_to);
        });

        irs_to.addEventListener('DOMSubtreeModified', function () {
            filters__range_slider_max__number.textContent = irs_to.textContent;
            parameter_value_price_to = parseInt(irs_to.textContent.replace(/\s/g, ''), 10);
            parameter_value_price_from = parseInt(irs_from.textContent.replace(/\s/g, ''), 10);
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

    /* Загрузка данных из адресной строки в фильтры над каталог */
    let search_url_for_filters = new URL(filters__show_items.href);

    filters_items = search_url_for_filters.searchParams.get(parameter);

    if (filters_items) {
        for (let item of filters_items.split(",")) {
            if (!filters_parameters.includes(item)) {
                filters_parameters.push(item);
                html_item = `
                <div class="catalog__filters--item">
                    <svg class="catalog__filters--item-cross" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6334 0.637262L1.31971 11.951M1.31971 0.637262L12.6334 11.951" stroke="black" stroke-linecap="round"/>
                    </svg>
                    <span class="catalog__filters--item">${item}</span>
                </div>`;
                catalog__filters.insertAdjacentHTML(`beforeend`, html_item);

                /* Удаление фильтров */
                const filters__crosses = document.querySelectorAll(".catalog__filters--item-cross");
                for (let cross of filters__crosses) {
                    cross.addEventListener("click", () => {
                        if (cross.parentNode.parentNode == catalog__filters) {

                            // for (let filter of filters__checkbox_inputs) {
                            //     if (filter.value == item) {
                            //         filter.click();
                            //         break;
                            //     }
                            // }

                            url = filters__show_items.href;
                            catalog__filters.removeChild(cross.parentNode);
                            item = encodeURIComponent(item);
                            url = url.replace(new RegExp("[,&]" + item, "g"), "").replace("," + item, "").replace(item + ",", "").replace(item, "");
                            item = item.replace(/%20/g, "+");
                            url = url.replace(new RegExp("[,&]" + item, "g"), "").replace("," + item, "").replace(item + ",", "").replace(item, "");

                            search_url = new URL(url);

                            if (search_url.searchParams.has(parameter) && !search_url.searchParams.get(parameter)) {
                                search_url.searchParams.delete(parameter);
                            }

                            filters__show_items.href = search_url.href.replace("%2C", ",");
                        }
                    })
                }
            }
        }
    }
};

/* Загрузка данных из адресной строки в фильтры над каталог (цвет) */
for (let item of filters__colors__items) {

    let search_url_for_filters = new URL(filters__show_items.href);
    parameter = "color";
    filters_items = search_url_for_filters.searchParams.get(parameter);

    if (filters_items) {
        for (let item of filters_items.split(",")) {
            if (!filters_parameters.includes(item)) {
                let url = filters__show_items.href;
                filters_parameters.push(item);
                html_item = `
                    <div class="catalog__filters--item">
                        <svg class="catalog__filters--item-cross" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6334 0.637262L1.31971 11.951M1.31971 0.637262L12.6334 11.951" stroke="black" stroke-linecap="round"/>
                        </svg>
                        <span class="catalog__filters--item">${item}</span>
                    </div>`;
                catalog__filters.insertAdjacentHTML(`beforeend`, html_item);

                /* Удаление фильтров */
                const filters__crosses = document.querySelectorAll(".catalog__filters--item-cross");
                for (let cross of filters__crosses) {
                    cross.addEventListener("click", () => {
                        if (cross.parentNode.parentNode == catalog__filters) {

                            // for (let color of filters__colors__items) {
                            //     if (color.getAttribute("data-color") == item) {
                            //         color.click();
                            //         break;
                            //     }
                            // }

                            url = filters__show_items.href;
                            catalog__filters.removeChild(cross.parentNode);
                            item = encodeURIComponent(item);
                            url = url.replace(new RegExp("[,&]" + item, "g"), "").replace("," + item, "").replace(item + ",", "").replace(item, "");
                            item = item.replace(/%20/g, "+");
                            url = url.replace(new RegExp("[,&]" + item, "g"), "").replace("," + item, "").replace(item + ",", "").replace(item, "");

                            search_url = new URL(url);

                            if (search_url.searchParams.has(parameter) && !search_url.searchParams.get(parameter)) {
                                search_url.searchParams.delete(parameter);
                            }
                            filters__show_items.href = search_url.href.replace("%2C", ",");
                        }
                    })
                }
            }
        }
    }
}
let url = filters__show_items.href;

// Для цвета (если в адресной строке есть значения)
let parameter_color = "color";

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

        for (let item of filters__colors__items) {
            for (let filter_param of filter_params) {
                if (item.getAttribute("data-color") == filter_param) {
                    item.classList.toggle("filters__colors--item--active");
                }
            }
        }
    }
}


/* События для определения того, что юзер нажал на инпут с фильтром */
for (let filter of filters__checkbox_inputs) {
    filter.addEventListener("change", () => {
        const parameter = filter.parentNode.parentNode.parentNode.id.split("--")[1];
        let parameter_value = encodeURIComponent(filter.getAttribute("value"));
        const parameter_url = `${parameter}=${parameter_value}`.replace(/ /g, "%20");

        let url = filters__show_items.href;

        if (url.indexOf(parameter_value) >= 0) {
            url = url.replace(new RegExp("[,&]" + parameter_value, "g"), "").replace(parameter_value + ",", "").replace(parameter_value, "");
            parameter_value = encodeURIComponent(parameter_value)
            search_url = new URL(url);

            if (search_url.searchParams.has(parameter) && !search_url.searchParams.get(parameter).replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")) {
                search_url.searchParams.delete(parameter);
            }

            filters__show_items.href = search_url.href.replace("%2C", ",");
            return

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

        filters__show_items.href = newUrl.replace("%2C", ",");
    })
};

/* Функционал нажатия на цвета в блоке "Цвет" */

for (let item of filters__colors__items) {
    item.addEventListener("click", () => {
        item.classList.toggle("filters__colors--item--active");
        const parameter = "color";
        let parameter_value = item.getAttribute("data-color");
        const parameter_url = `${parameter}=${parameter_value}`.replace(/ /g, "%20");

        let url = filters__show_items.href;

        if (url.indexOf(parameter_value) >= 0) {
            url = url.replace(new RegExp("[,&]" + parameter_value, "g"), "").replace(parameter_value + ",", "").replace(parameter_value, "");
            parameter_value = encodeURIComponent(parameter_value)
            search_url = new URL(url);

            if (search_url.searchParams.has(parameter) && !search_url.searchParams.get(parameter).replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")) {
                search_url.searchParams.delete(parameter);
            }
            filters__show_items.href = search_url.href.replace("%2C", ",");
            return

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

        filters__show_items.href = newUrl.replace("%2C", ",");
    })
};

/* Событие, если юзер изменяет тип сортировку */
catalog__filters__sort.addEventListener("change", () => {
    const parameter_value = encodeURIComponent(catalog__filters__sort.value);
    const parameter_url = `sort=${parameter_value}`;

    let url = filters__show_items.href;

    if (url.indexOf("sort") >= 0) {
        url = url.replace(/(sort=)[^&]*/, parameter_url);
        filters__show_items.href = url;
        return
    }

    if (url.indexOf('?') !== -1) {
        // Если есть, добавляем новый параметр через "&"
        url += '&' + parameter_url;
    } else {
        // Если нет, добавляем новый параметр через "?"
        url += '?' + parameter_url;
    }

    filters__show_items.href = url;
})