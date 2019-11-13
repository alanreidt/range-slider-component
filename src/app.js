import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

const slider = new Slider({
  values: [0, 100],
  hasTooltips: true,
});
const model = new Model(slider);

const $parent = document.querySelector(".user-slider");
const sliderUi = new SliderUI($parent, model);

const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
model.addSubscriber("update", sliderUiBoundedUpdate);
