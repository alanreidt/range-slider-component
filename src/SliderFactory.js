import Model from './Model';
import ViewController from './ViewController';

const SliderFactory = {
  createModel(...args) {
    return new Model(...args);
  },

  createUI(...args) {
    return new ViewController(...args);
  },
};

export default SliderFactory;
