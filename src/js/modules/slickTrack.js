function slickTrack() {
    
    const tabItem = document.querySelectorAll('.decoration_item div'),
          internal = document.querySelector('.decoration .internal'),
          external = document.querySelector('.decoration .external'),
          rising = document.querySelector('.decoration .rising'),
          roof = document.querySelector('.decoration .roof');
    
    tabItem.forEach((i, n) => {
        i.addEventListener('click', () => {
            tabItem.forEach((it) => {
                it.classList.remove('after_click');
            });

            i.classList.add('after_click');

            internal.style.display = 'none';
            external.style.display = 'none';
            rising.style.display = 'none';
            roof.style.display = 'none';

            if(tabItem[0].classList.contains('after_click')) {
                internal.style.display = 'block';
            } else if(tabItem[1].classList.contains('after_click')) {
                external.style.display = 'block';
            } else if(tabItem[2].classList.contains('after_click')) {
                rising.style.display = 'block';
            } else if(tabItem[3].classList.contains('after_click')) {
                roof.style.display = 'block';
            }
        });
    });

}

export default slickTrack;