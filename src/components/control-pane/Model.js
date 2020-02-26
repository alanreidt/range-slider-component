import cloneDeep from 'lodash/cloneDeep';

import { ObserverMixin } from '../../../modules/utilities';

class Model {
  constructor(options) {
    this._options = {};

    this.setOptions(options);
  }

  getOptions() {
    return cloneDeep(this._options);
  }

  setOptions(options) {
    this._options = options;

    this.triggerSubscribers('update', this.getOptions());
  }
}

Object.assign(Model.prototype, ObserverMixin);

export default Model;
