export class Slider {
  // don't use object destructuring as
  // I need to loop over an object
  constructor(options = {}) {
    // Assign default values directly in order
    // to avoid their redundant pass through setters
    this._options = {
      boundaries: [0, 100],
      value: null,
      step: null,
      orientation: "horizontal",
      tooltips: false,
    };

    for (let key in this._options) {
      if ( options[key] === undefined ) continue;
      this[key] = options[key];
    }
  }

  get boundaries() {
    return this._options.boundaries;
  }
  set boundaries(value) {
    let currentValue = this._options.boundaries;

    if (value === Number) {
      let floatItem = convertToFloat(value);

      if (floatItem === undefined) return;

      if (floatItem >= currentValue[1]) {
        currentValue[1] = floatItem;
      } else {
        currentValue[0] = floatItem;
      }
    }

    if ( Array.isArray(value) ) {
      let result = currentValue;

      for (let i = 0; i < result.length; i++) {
        let floatItem = convertToFloat( value[i] );

        if (floatItem === undefined) continue;

        result[i] = floatItem;
      }

      currentValue = result;
    }
  }

  get value() {
    return this._options.value || getAverageOf(this._options.boundaries);
  }
  set value(value) {
    let arr = Array.prototype.concat(value);
    let result = [];

    for (let item of arr) {
      let floatItem = convertToFloat(item);

      if ( floatItem === undefined ) continue;

      result.push(floatItem);
    }

    if (!result.length) return;

    if (result.length === 1) {
      result = Number(result);
    }

    this._options.value = result;
  }

  get step() {
    return this._options.step;
  }
  set step(value) {
    let floatValue = convertToFloat(value);

    if (floatValue === undefined || floatValue < 0) return;

    this._options.step = floatValue;
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

/**
 * Converts copy of a value to float and returns it,
 * otherwise returns undefined.
 *
 * @param {string} value The subject of operation
 * @param {number} value The subject of operation
 * @returns {number}
 * @returns {undefined} if float number can't be extracted
 */

function convertToFloat(value) {
  let floatValue = parseFloat(value);

  if ( isNaN(floatValue) ) return;

  return floatValue;
}

function getAverageOf(arr) {
  return arr.reduce( (sum, current) => sum + current, 0 ) / arr.length;
}
