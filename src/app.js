import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

const $parent = document.querySelector(".user-slider");

createSlider($parent, {
  values: [0, 100],
  hasTooltips: true,
});


function createSlider($parent, options) {
  const slider = new Slider(options);
  const model = new Model(slider);
  const sliderUi = new SliderUI($parent, model);

  const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
  model.addSubscriber("update", sliderUiBoundedUpdate);
}
