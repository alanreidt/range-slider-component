import {SliderAPI} from "./SliderAPI";

const $parent = document.querySelector(".user-slider");

SliderAPI.createSlider($parent, {
  values: [0, 100],
  hasTooltips: true,
});
