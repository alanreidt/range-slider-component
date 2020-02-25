import { ObserverMixin } from "../../../modules/slider/prod/Slider.min";

class Model {
  constructor(options) {
    this.setOptions(options);
  }

  getOptions() {
    return this._options;
  }

  setOptions(options) {
    this._options = options;
  }
}

Object.assign(Model.prototype, ObserverMixin);

export default Model;
