export class DomainModel {
  // don't use object destructuring as
  // I need to loop over an object
  constructor(options = {}) {
    // Assign default values directly in order
    // to avoid their redundant pass through setters
    this._options = {
      boundaries: [0, 100],
      step: null,
      orientation: "horizontal",
      tooltips: false,
    };

    for (let key in this._options) {
      if ( options[key] === undefined ) continue;
      this[key] = options[key];
    }

    // if value isn't passed
      // value is equal to half of the boundaries difference
    // value is equal to options.value
    this._options.value = (this._options.boundaries[1] - this._options.boundaries[0]) / 2;

    if (options.value !== undefined) {
      this.value = options.value;
    }
  }
}
