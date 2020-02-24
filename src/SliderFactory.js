import Model from './Model';
import ViewController from './ViewController/ViewController';

const SliderFactory = {
  createModel(...args) {
    return new Model(...args);
  },

  createViewController(...args) {
    return new ViewController(...args);
  },
};

export default SliderFactory;
