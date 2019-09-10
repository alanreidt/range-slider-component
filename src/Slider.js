import {convertToFloat, getAverageOf} from "./utilities";

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
      let filteredValue = parseFloat(value);

      if ( isNaN(filteredValue) ) return;

      if (filteredValue >= currentValue[1]) {
        currentValue[1] = filteredValue;
      } else {
        currentValue[0] = filteredValue;
      }
    }

    if ( Array.isArray(value) ) {
      let result = currentValue;

      for (let i = 0; i < result.length; i++) {
        let filteredItem = parseFloat( value[i] );

        if ( isNaN(filteredItem) ) continue;

        result[i] = filteredItem;
      }

      currentValue = result;
    }
  }

  get value() {
    return this._options.value || getAverageOf(this._options.boundaries);
  }
  set value(values) {
    let arrOfValues = Array.prototype.concat(values);
    let filteredArr = [];
    let step = this._options.step || 1; // edit (make it 1 by default?)
    let start = this._options.boundaries[0]; // edit: start not always equals to index[0]

    arrOfValues.forEach(item => {
      let filteredItem = parseFloat(item);

      if ( isNaN(filteredItem) ) return;

      if ( !isDivisible(filteredItem, step, start) ) {
        filteredItem = getNearestDivisibleOf(filteredItem, step, start);
      }

      filteredArr.push(filteredItem);
    });

    if (!filteredArr.length) return;

    this._options.value = !(filteredArr.length - 1) ? Number(filteredArr) : filteredArr;
  }

  get step() {
    return this._options.step;
  }
  set step(value) {
    let filteredValue = parseFloat(value);

    if (isNaN(filteredValue) || filteredValue < 0) return;

    this._options.step = filteredValue;
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
