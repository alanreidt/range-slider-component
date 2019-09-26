import {observerMixin} from "./utilities";

export class Model {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getValues() {
    return this.dataSource.getValues();
  }

  setValues(values = {}) {

    for (let key in values) {
      this.dataSource[key] = values[key];
    }

  }
}

Object.assign(Model.prototype, observerMixin);
