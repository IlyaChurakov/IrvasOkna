function gallery() {
    const preview = document.querySelectorAll('.preview'),
          body = document.querySelector('body');

    preview.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            let url = item.outerHTML.split('works/')[1].split('" ')[0];
            const prevWrapper = document.createElement('div');
            prevWrapper.classList.add('prevWrapper');
            body.prepend(prevWrapper);

            prevWrapper.innerHTML = `
                <img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 80%;" src="assets/img/our_works/big_img/${url}">;
            `;

            prevWrapper.addEventListener('click', (e) => {
                if(e.target != prevWrapper.querySelector('img')) {
                    prevWrapper.remove();
                }
            });

        });
    });
}

export default gallery;