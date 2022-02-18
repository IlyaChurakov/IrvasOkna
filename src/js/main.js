import './slider';
import modal from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import timer from './modules/timer';
import gallery from './modules/gallery';
import tabsModals from './modules/tabsModals';

window.addEventListener('DOMContentLoaded', () => {

    modal();
    tabs();
    tabsModals();
    forms();
    timer('2022-03-01');
    gallery();
});