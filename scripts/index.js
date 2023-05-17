import { slider } from "./slider.js";
import { navbar } from "./navbar.js";

window.addEventListener('DOMContentLoaded', () => {
  slider('.hero-slide', '.hero-slider-wrapper','.hero-slider-inner', '.indicator-progress');
  navbar('.navbar-toggler', '.navbar-collapse');
})