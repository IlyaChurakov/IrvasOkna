function forms() {

    const phonebtns = document.querySelectorAll('.regNum');

    phonebtns.forEach((item) => {
        Regular(item, /\D/);//Передаем инпут, который проверяем, и выражение-шаблон
    });

    function Regular(input, reg) {
        input.addEventListener('input', (e) => {
            let regex = reg;
            if (input.value.match(regex)) {//Проверяем на совпадение
                let circle = input.value.length;//Берем изначальное значение длины
                for(let i = 0; i < circle; i++) {//Запускаем цикл, который пройдется столько раз, сколько было символов в самом начале
                    if (input.value.match(regex)) {
                        input.value = input.value.substring(0, input.value.length - 1);//Уберутся все символы после запретного до разрешенного то есть в выражении 123абв456 останется только 123, а в выражении абв123 не останется ничего
                    }
                }
            }
        });
    }
    
    //Отправка данных с формы

    const forms = document.querySelectorAll('.form');

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

    function bindPostData(form) {
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
                    json = JSON.stringify(Object.fromEntries(formData.entries()));

            formData.forEach((value, key) => {
                object[key] = value;
            });

            postData('http://localhost:3000/requests', json) 
            .then(() => {
                statusMessage.textContent = message.success;
            })
            .catch(() => {
                statusMessage.textContent = message.failure;
            })
            .finally(() => {
                form.reset();
                setTimeout(() => {
                    statusMessage.textContent = '';
                    document.querySelector('.popup_engineer').style.display = 'none';
                    document.querySelector('.popup').style.display = 'none';
                    document.body.style.overflow = '';
                }, 2000);
                
            }); 
        });
    }

    forms.forEach(item => {
        if(item != forms[8]) {
            bindPostData(item);
        }
    });



}

export default forms;