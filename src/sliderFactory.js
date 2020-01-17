import { SliderModel } from "./SliderModel";
import { SliderUI } from "./SliderUI";

export const sliderFactory = {
  createModel(...args) {
    return new SliderModel(...args);
  },

  createUI(...args) {
    return new SliderUI(...args);
  },
};
