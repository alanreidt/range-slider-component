import Model from './Model';
import { ViewController } from './ViewController';

export const sliderFactory = {
  createModel(...args) {
    return new Model(...args);
  },

  createUI(...args) {
    return new ViewController(...args);
  },
};
