import { observerMixin } from "./utilities/observerMixin/observerMixin";


export class SliderAdapter {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  setValueAt(index, newValue) {
    this.dataSource.setValueAt(index, newValue);

    this.triggerSubscribers("update", this.getOptions() );
  }

  getOptions() {
    return this.dataSource.getOptions();
  }

  update(options) {
    const newOptions = this.dataSource.setOptions(options);

    this.triggerSubscribers("update", newOptions);
  }
}

Object.assign(SliderAdapter.prototype, observerMixin);
