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
let sliderUi = new SliderUI(sliderElement, template);

const sliderUiBoundedPaint = sliderUi.paint.bind(sliderUi);
const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);

model.addSubscriber( "create", sliderUiBoundedPaint );
model.addSubscriber( "update", sliderUiBoundedUpdate );

model.triggerSubscribers( "create", model.getValues() );

model.triggerSubscribers("update", {
  boundaries: [0, 100],
  values: [30, 70],
});
