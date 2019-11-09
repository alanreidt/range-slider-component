import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

let slider = new Slider({
  values: [0, 100],
  hasTooltips: true,
});
let model = new Model(slider);

let $parent = document.querySelector(".someUserClass");
let sliderUi = new SliderUI($parent, model);

const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);

model.addSubscriber( "update", sliderUiBoundedUpdate );

model.triggerSubscribers("update", {
  boundaries: [0, 100],
  values: [30, 70],
});
