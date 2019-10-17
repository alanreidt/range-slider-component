import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";

let slider = new Slider({
  value: [0, 100],
  tooltips: true,
});
let model = new Model(slider);
let sliderui = new SliderUI();
let sliderElement = document.querySelector(".slider");

sliderui.create( sliderElement, model.getValues() );
sliderElement.append(sliderui.sliderUI);
