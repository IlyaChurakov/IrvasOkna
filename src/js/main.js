import './slider';
import modal from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import slickTrack from './modules/slickTrack';
import timer from './modules/timer';
import gallery from './modules/gallery';

window.addEventListener('DOMContentLoaded', () => {

    modal();
    tabs();
    forms();
    slickTrack();
    timer('2022-02-30');
    gallery();
});