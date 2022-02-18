function tabsModals() {

    //Объект, хранящий в себе данные с формы, которые будут отправлены на сервер

    let orderData = {
        // form: '',
        // width: '',
        // height: '',
        // type: '',
        // temp: ''
        //Туда будут записываться данные строки, но изначально объект пустой, также он чистится в конце
    };

    function clickClosePopup(window, closeSelector, closeWindowSelector) {
        window.addEventListener('click', (e) => {

            const close = document.querySelector(closeSelector),
                  strong = close.querySelector('strong');

            if(e.target == window || e.target == close || e.target == strong) {
                closePopupCalc(closeWindowSelector);
            }
        });
    }

    function closePopupCalc(selector) {
        document.querySelector(selector).style.cssText = 'display: none';
    }
    function showPopupCalc(selector) {
        document.querySelector(selector).style.cssText = 'display: block';
    }

    //Кнопки рассчета стоимости

    const popupCalc = document.querySelector('.popup_calc'),
          btnCalc = document.querySelectorAll('.popup_calc_btn'),
          width = document.querySelector('#width'),
          height = document.querySelector('#height'),
          formCalc = document.querySelector('#formCalc');

    // При нажатии на кнопку рассчета стоимости открывается 1-е модальное окно

    btnCalc.forEach((item) => {
        item.addEventListener('click', () => {

            showPopupCalc('.popup_calc');
            clickClosePopup(popupCalc, '.popup_calc_close', '.popup_calc');

            const windowForm = popupCalc.querySelectorAll('span img'),
                  windowFormParent = popupCalc.querySelectorAll('span'),
                  bigActiveForm = document.querySelectorAll('.popup_calc_content .big_img img');

            windowForm.forEach((item, num) => {
                item.addEventListener('click', () => {

                    windowFormParent.forEach((i, n) => {
                        i.classList.remove('do_image_more');
                        windowFormParent[num].classList.add('do_image_more');
                        bigActiveForm.forEach((s) => {
                            s.style.display = '';
                        });
                        bigActiveForm[num].style.display = 'block';
                    });
                });
            });// Реализация табов в 1-м модальном окне

            // Галочка только в одном чекбоксе

            const toPopupCalcProfile = document.querySelector('.popup_calc_button'),
                  checkboxes = document.querySelectorAll('.checkbox');

            checkboxes.forEach((i, n) => {
                i.addEventListener('click', () => {
                    checkboxes.forEach(item => {
                        item.checked = '';
                    });
                    i.checked = 'checked';
                });
            });

            //Кнопка перехода ко 2-му окну
            
            toPopupCalcProfile.addEventListener('click', () => {

                bigActiveForm.forEach((item, num) => {
                    if(item.style.display == 'block') {
                        orderData.form = `Форма ${num + 1}`;
                    }
                });

                orderData.width = width.value;
                orderData.height = height.value;// Записываем данные, выбранные пользователем, в объект

                closePopupCalc('.popup_calc');
                showPopupCalc('.popup_calc_profile');

                const popupCalcProfile = document.querySelector('.popup_calc_profile');
                const toPopupCalcEnd = document.querySelector('.popup_calc_profile_button');

                clickClosePopup(popupCalcProfile, '.popup_calc_profile_close', '.popup_calc_profile');

                // Переход на последнее окно, при нажатии на кнопку перехода мы собираем информацию с чекбоксов и списка выбора

                toPopupCalcEnd.addEventListener('click', () => {

                    closePopupCalc('.popup_calc_profile');
                    showPopupCalc('.popup_calc_end');

                    const viewType = document.getElementById("view_type").options.selectedIndex;
                    const text = document.getElementById("view_type").options[viewType].text;

                    orderData.type = text;// Записываем данные, выбранные пользователем, в объект
                    
                    if(checkboxes[0].checked) {
                        orderData.temp = 'Холодное остекление';
                    } else if(checkboxes[1].checked) {
                        orderData.temp = 'Теплое остекление';
                    }

                    const popupCalcEnd = document.querySelector('.popup_calc_end');

                    clickClosePopup(popupCalcEnd, '.popup_calc_end_close', '.popup_calc_end');
                });
                
            });
        });
    });

    // Добавление данных из объекта orderData в объект formData и отправка его на сервер

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    function bindPostOrderData(form) {
        form.addEventListener('submit', (e) => {

            e.preventDefault();

            const statusMessage = document.createElement('div'),
                    loading = document.createElement('div');
            
            loading.textContent = message.loading;
            form.append(statusMessage);
            statusMessage.append(loading);
            statusMessage.style.cssText = `
                display: block;
                margin: 30px auto 0 auto;
            `;

            // Перезапись formData, преобразование данных с формы и данных из нашего объекта в единый json

            const formData = new FormData(form),
                    object = {},
                    json = JSON.stringify(Object.fromEntries(formData.entries())),
                    json2 = JSON.stringify(orderData),
                    obj1 = JSON.parse(json),
                    obj2 = JSON.parse(json2),
                    json3 = {...obj1, ...obj2},
                    json4 = JSON.stringify(json3);

            formData.forEach((value, key) => {
                object[key] = value;
            });// Перезапись данных из object в formData, который ниже отправляем

            postData('http://localhost:3000/requests', json4) 
            .then(() => {
                statusMessage.textContent = message.success;
            })
            .catch(() => {
                statusMessage.textContent = message.failure;
            })
            .finally(() => {
                form.reset();//Очистка формы
                orderData = {};//Очистка объекта

                document.querySelectorAll('.checkbox').forEach(item => {
                    item.checked = '';
                });//Очистка чекбоксов

                width.value = '';
                height.value = '';

                setTimeout(() => {
                    statusMessage.textContent = '';
                    document.querySelector('.popup_calc_end').style.display = 'none';
                    document.body.style.overflow = '';
                }, 2000);
            }); 
        });
    }

    bindPostOrderData(formCalc);
}

export default tabsModals;