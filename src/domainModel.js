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

  get boundaries() {
    return this._options.boundaries;
  }
  set boundaries(arr) {
    let parsedArray = arr.map( item => parseFloat(item) );

    if ( parsedArray.includes(NaN) ) return;

    this._options.boundaries = parsedArray;
  }

  get value() {
    return this._options.value;
  }
  set value(value) {
    let arr = [].concat(value);
    let result = [];

    for (let item of arr) {
      let parsedItem = parseFloat(item);

      if ( isNaN(parsedItem) ) return;

      result.push(parsedItem);
    }

    if (result.length === 1) {
      result = Number(result);
    }

    this._options.value = result;
  }

  get step() {
    return this._options.step;
  }
  set step(value) {
    let parsedValue = parseFloat(value);

    if (isNaN(parsedValue) || parsedValue < 0) return;

    this._options.step = parsedValue;
  }

  get orientation() {
    return this._options.orientation;
  }
  set orientation(value) {
    if (value !== "horizontal" && value !== "vertical") return;

    this._options.orientation = value;
  }

  get tooltips() {
    return this._options.tooltips;
  }
  set tooltips(value) {
    if (value !== false && value !== true) return;

    this._options.tooltips = value;
  }
}
