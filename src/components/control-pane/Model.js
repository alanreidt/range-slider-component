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
