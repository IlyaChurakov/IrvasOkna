function modal() {

    

    const callSpecialistBtn = document.querySelector('.header_btn'),
          closeModalBtn = document.querySelectorAll('.popup_close'),
          modalBg = document.querySelector('.popup_engineer'),
          phoneLink = document.querySelectorAll('.phone_link'),
          popup = document.querySelector('.popup');

    const id = setTimeout(() => {
        showModal(modalBg);
    }, 500000);

    function showAndCloseModal(showBtnSelector, BgSelector) {
        showBtnSelector.addEventListener('click', (e) => {
            if(e.target) {
                e.preventDefault();
            }

            showModal(BgSelector);
        });
    
        closeModalBtn.forEach((item) => {
            item.addEventListener('click', () => {
                closeModal(BgSelector);
                
            });
        });

        BgSelector.addEventListener('click', (e) => {
            if(e.target == BgSelector) {
                closeModal(BgSelector);
            }
        });
    }

    function showModal(modalSelector) {
        modalSelector.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(id);
    }

    function closeModal(modalSelector) {
        modalSelector.style.display = 'none';
        document.body.style.overflow = '';
        // clearTimeout(id);
    }

    showAndCloseModal(callSpecialistBtn, modalBg);

    phoneLink.forEach((item) => {
        showAndCloseModal(item, popup);
    });   
}

export default modal;