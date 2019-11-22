import {Slider} from "./Slider";
import {SliderAdapter} from "./SliderAdapter";
import {SliderUI} from "./SliderUI";


export const sliderFactory = {
  createSlider(...args) {
    return new Slider(...args);
  },

  createAdapter(...args) {
    return new SliderAdapter(...args);
  },

  createUI(...args) {
    return new SliderUI(...args);
  }
};
