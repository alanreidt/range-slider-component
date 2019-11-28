import { observerMixin } from "./utilities/observerMixin";

export class SliderAdapter {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getOptions() {
    return this.dataSource.getValues();
  }

  update(options) {
    const newOptions = this.dataSource.setValues(options);

    this.triggerSubscribers("update", newOptions);
  }
}

Object.assign(SliderAdapter.prototype, observerMixin);
