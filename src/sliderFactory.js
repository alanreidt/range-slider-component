import Model from './Model';
import ViewController from './ViewController';

const sliderFactory = {
  createModel(...args) {
    return new Model(...args);
  },

  createUI(...args) {
    return new ViewController(...args);
  },
};

export default sliderFactory;
