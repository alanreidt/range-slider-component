import Model from './Model/Model';
import ViewController from './ViewController';

const SliderFactory = {
  createModel(...args) {
    return new Model(...args);
  },

  createViewController(...args) {
    return new ViewController(...args);
  },
};

export default SliderFactory;
