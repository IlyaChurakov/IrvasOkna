function modal() {
    const callSpecialistBtn = document.querySelector('.header_btn'),
          closeModalBtn = document.querySelectorAll('.popup_close'),
          modalBg = document.querySelector('.popup_engineer'),
          phoneLink = document.querySelectorAll('.phone_link'),
          popup = document.querySelector('.popup');

    function showAndCloseModal(showBtnSelector, BgSelector) {
        showBtnSelector.addEventListener('click', (e) => {
            if(e.target) {
                e.preventDefault();
            }

            BgSelector.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    
        closeModalBtn.forEach((item) => {
            item.addEventListener('click', () => {
                BgSelector.style.display = 'none';
                document.body.style.overflow = '';
            });
        });

        BgSelector.addEventListener('click', (e) => {
            if(e.target == BgSelector) {
                BgSelector.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    showAndCloseModal(callSpecialistBtn, modalBg);

    phoneLink.forEach((item) => {
        showAndCloseModal(item, popup);
    });   
}

export default modal;