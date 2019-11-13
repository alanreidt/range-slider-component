import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

const $parent = document.querySelector(".user-slider");
const $parentVertical = document.querySelector(".user-slider-vertical");

createSlider($parent, {
  values: [0, 100],
  hasTooltips: true,
});

createSlider($parentVertical, {
  boundaries: [200, 1000],
  values: [300, 800],
  step: 100,
  orientation: "vertical",
  hasTooltips: true,
});


function createSlider($parent, options) {
  const slider = new Slider(options);
  const model = new Model(slider);
  const sliderUi = new SliderUI($parent, model);

  const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
  model.addSubscriber("update", sliderUiBoundedUpdate);
}
