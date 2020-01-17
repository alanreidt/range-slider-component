import { Model } from "./Model";
import { SliderUI } from "./SliderUI";

export const sliderFactory = {
  createModel(...args) {
    return new Model(...args);
  },

  createUI(...args) {
    return new SliderUI(...args);
  },
};
