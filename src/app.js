import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

let slider = new Slider({
  values: [0, 100],
  hasTooltips: true,
});
let model = new Model(slider);
let sliderElement = document.querySelector(".someUserClass");
let sliderUI = new SliderUI(sliderElement, model);
