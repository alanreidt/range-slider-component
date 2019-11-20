import {Slider} from "./Slider";
import {Model} from "./Model";
import {SliderUI} from "./SliderUI";


export const sliderFactory = {
  createSlider(...args) {
    return new Slider(...args);
  },

  createModel(...args) {
    return new Model(...args);
  },

  createUI(...args) {
    return new SliderUI(...args);
  }
};
