import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

let slider = new Slider({
  values: [0, 100],
  hasTooltips: true,
});
let model = new Model(slider);

let $parent = document.querySelector(".user-slider");
let sliderUi = new SliderUI($parent, model);

const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
model.addSubscriber("update", sliderUiBoundedUpdate);
