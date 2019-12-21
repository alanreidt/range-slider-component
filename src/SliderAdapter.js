import { observerMixin } from "./utilities/observerMixin/observerMixin";

export class SliderAdapter {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getOptions() {
    return this.dataSource.getOptions();
  }

  setOptions(options) {
    const newOptions = this.dataSource.setOptions(options);

    this.triggerSubscribers("update", newOptions);
  }

  setValueAt(index, newValue) {
    this.dataSource.setValueAt(index, newValue);

    this.triggerSubscribers("update", this.getOptions());
  }
}

Object.assign(SliderAdapter.prototype, observerMixin);
