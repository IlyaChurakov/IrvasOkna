function tabs() {
    
    const img = document.querySelectorAll('.glazing_block'),
          a = document.querySelectorAll('.glazing a'),
          glazingContent = document.querySelectorAll('.glazing_content'),
          popupCalc = document.querySelector('.popup_calc'),
          btnCalc = document.querySelectorAll('.popup_calc_btn'),
          width = document.querySelector('#width'),
          height = document.querySelector('#height'),
          formCalc = document.querySelector('#formCalc');

    /*Переключение вида окон при нажатии на табы*/
    
    function activeTab(tapElem) {
        tapElem.forEach((item, num) => {
            item.addEventListener('click', () => {
                a.forEach((it) => {
                    it.classList.remove('active');
                });
                a[num].classList.add('active');
    
                glazingContent.forEach((i) => {
                    i.style.display = 'none';
                    glazingContent[num].style.display = 'block';
                });
            });
        });
    }

    activeTab(img);
    activeTab(a);

    //Объект, хранящий в себе данные с формы, которые будут отправлены на сервер

    let orderData = {
        // form: '',
        // width: '',
        // height: '',
        // type: '',
        // temp: ''
        //Туда будут записываться данные строки, но изначально объект пустой, также он чистится в конце
    };

    //Кнопки рассчета стоимости

    btnCalc.forEach((item) => {
        item.addEventListener('click', () => {
            showPopupCalc('.popup_calc');
            
            popupCalc.addEventListener('click', (e) => {

                const close = document.querySelector('.popup_calc_close'),
                      strong = close.querySelector('strong');

                if(e.target == popupCalc || e.target == close || e.target == strong) {
                    closePopupCalc('.popup_calc');
                }
            });

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
            });

            const topopupCalcProfile = document.querySelector('.popup_calc_button'),
                  checkboxes = document.querySelectorAll('.checkbox');

            //Галочка только в одном чекбоксе

            checkboxes.forEach((i, n) => {
                i.addEventListener('click', () => {
                    checkboxes.forEach(item => {
                        item.checked = '';
                    });
                    i.checked = 'checked';
                });
            });

            //Выбор типа окна
            
            topopupCalcProfile.addEventListener('click', () => {
                
                if(bigActiveForm[0].style.display == 'block') {
                    orderData.form = 'Форма 1';
                } else if(bigActiveForm[1].style.display == 'block') {
                    orderData.form = 'Форма 2';
                } else if(bigActiveForm[2].style.display == 'block') {
                    orderData.form = 'Форма 3';
                } else if(bigActiveForm[3].style.display == 'block') {
                    orderData.form = 'Форма 4';
                }

                // Regular(width, /\D/);

                orderData.width = width.value;
                orderData.height = height.value;

                closePopupCalc('.popup_calc');
                showPopupCalc('.popup_calc_profile');

                const popupCalcProfile = document.querySelector('.popup_calc_profile');

                popupCalcProfile.addEventListener('click', (e) => {
                    
                    const close = document.querySelector('.popup_calc_profile_close'),
                          strong = close.querySelector('strong');

                    if(e.target == popupCalcProfile || e.target == close || e.target == strong) {
                        closePopupCalc('.popup_calc_profile');
                    }
                });

                const topopupCalcEnd = document.querySelector('.popup_calc_profile_button');

                topopupCalcEnd.addEventListener('click', () => {
                    closePopupCalc('.popup_calc_profile');
                    showPopupCalc('.popup_calc_end');

                    const viewType = document.getElementById("view_type").options.selectedIndex;
                    const text = document.getElementById("view_type").options[viewType].text;
                    orderData.type = text;
                    
                    if(checkboxes[0].checked) {
                        orderData.temp = 'Холодное остекление';
                    } else if(checkboxes[1].checked) {
                        orderData.temp = 'Теплое остекление';
                    }

                    const popupCalcEnd = document.querySelector('.popup_calc_end');

                    popupCalcEnd.addEventListener('click', (e) => {

                        const close = document.querySelector('.popup_calc_end_close'),
                              strong = close.querySelector('strong');

                        if(e.target == popupCalcEnd || e.target == close || e.target == strong) {
                            closePopupCalc('.popup_calc_end');
                        }
                    });
                });
                
            });
        });
    });

    function closePopupCalc(selector) {
        document.querySelector(selector).style.cssText = 'display: none';
    }
    function showPopupCalc(selector) {
        document.querySelector(selector).style.cssText = 'display: block';
    }

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

            const formData = new FormData(form),
                    object = {},
                    //Преобразование данных с формы и данных из нашего объекта в единый json
                    json = JSON.stringify(Object.fromEntries(formData.entries())),
                    json2 = JSON.stringify(orderData),
                    obj1 = JSON.parse(json),
                    obj2 = JSON.parse(json2),
                    json3 = {...obj1, ...obj2},
                    json4 = JSON.stringify(json3);

            formData.forEach((value, key) => {
                object[key] = value;
            });

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

                document.querySelectorAll('.checkbox').forEach((item, n) => {
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

export default tabs;