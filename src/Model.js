import {observerMixin} from "./utilities";

export class Model {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getValues() {
    return this.dataSource.getValues();
  }

  update(options) {
    const newOptions = this.dataSource.setValues(options);

    this.triggerSubscribers("update", newOptions);
  }
}

Object.assign(Model.prototype, observerMixin);
