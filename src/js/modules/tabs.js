function tabs() {
    
    const img = document.querySelectorAll('.glazing_block'),
          a = document.querySelectorAll('.glazing a'),
          glazingContent = document.querySelectorAll('.glazing_content'),
          elem = document.querySelectorAll('.decoration_item div'),
          tabItem = document.querySelectorAll('.decoration_content-item'),
          aElem = document.querySelectorAll('.decoration_item div a');
    
    function activeTab(bar, content, cssClass) {
        bar.forEach((item, num) => {
            item.addEventListener('click', (e) => {
                a.forEach((i) => {
                    i.classList.remove(cssClass);
                    a[num].classList.add(cssClass);
                });//Для остекления

                bar.forEach((i) => {
                    i.classList.remove(cssClass);
                });//Для отделки

                aElem.forEach(i => {
                    i.classList.remove(cssClass);
                });

                item.classList.add(cssClass);

                if(aElem[num]) {
                    aElem[num].classList.add(cssClass);
                }
    
                content.forEach((i) => {
                    i.style.display = 'none';
                    content[num].style.display = 'block';
                });
            });
        });
    }

    activeTab(img, glazingContent, 'active');
    activeTab(a, glazingContent, 'active');
    activeTab(elem, tabItem, 'after_click');
}

export default tabs;