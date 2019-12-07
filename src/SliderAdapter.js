import { observerMixin } from "./utilities/observerMixin/observerMixin";


export class SliderAdapter {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  setHandle(index, newValue) {
    this.dataSource.setHandle(index, newValue);

    this.triggerSubscribers("update", this.getOptions() );
  }

  getOptions() {
    return this.dataSource.getOptions();
  }

  update(options) {
    const newOptions = this.dataSource.setValues(options);

    this.triggerSubscribers("update", newOptions);
  }
}

Object.assign(SliderAdapter.prototype, observerMixin);
