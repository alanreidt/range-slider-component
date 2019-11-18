import {SliderAPI} from "./SliderAPI";

const $parent = document.querySelector(".user-slider");
const $parentVertical = document.querySelector(".user-slider-vertical");

SliderAPI.createSlider($parent, {
  values: [0, 100],
  hasTooltips: true,
});

SliderAPI.createSlider($parentVertical, {
  boundaries: [200, 1000],
  values: [300, 800],
  step: 100,
  orientation: "vertical",
  hasTooltips: true,
});
