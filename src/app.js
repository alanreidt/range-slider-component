import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";
import {Template} from "./Template";

let slider = new Slider({
  values: [0, 100],
  hasTooltips: true,
});
let model = new Model(slider);
let sliderElement = document.querySelector(".someUserClass");
let template = new Template();
let sliderUI = new SliderUI(sliderElement, model, template);

sliderUI.update({
  boundaries: [0, 100],
  values: [30, 70],
});
