import {SliderModel} from "./SliderModel";
import {SliderAdapter} from "./SliderAdapter";
import {SliderUI} from "./SliderUI";


export const sliderFactory = {
  createModel(...args) {
    return new SliderModel(...args);
  },

  createAdapter(...args) {
    return new SliderAdapter(...args);
  },

  createUI(...args) {
    return new SliderUI(...args);
  }
};
