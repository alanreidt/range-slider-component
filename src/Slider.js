import {getAverageOf, getNearestDivisibleOf, isValueInBetween, getNearestTo, getNearestDividendableOf} from "./utilities";

export class Slider {
  // don't use object destructuring as
  // I need to loop over an object
  constructor(options = {}) {
    // Assign default values directly in order
    // to avoid their redundant pass through setters
    this._options = {
      boundaries: [0, 100],
      value: null,
      step: 1,
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
      let [start, end] = currentValue;

      let filteredValue = parseFloat(value);

      if ( isNaN(filteredValue) ) return;

      if ( getNearestTo(filteredValue, start, end) === start ) {
        currentValue[0] = filteredValue;
      } else {
        currentValue[1] = filteredValue;
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

    this.value = this._options.value;
    this.step = this._options.step;
  }

  get value() {
    return this._options.value || getAverageOf(this._options.boundaries);
  }
  set value(values) {
    let arrOfValues = Array.prototype.concat(values);
    let filteredArr = [];
    let step = this._options.step;
    let start = this._options.boundaries[0]; // edit: start not always equals to index[0]
    let end = this._options.boundaries[1]; // edit: end not always equals to index[1]

    arrOfValues.sort( (a, b) => a - b ).forEach(item => {
      let filteredItem = parseFloat(item);

      filteredItem = ( isValueInBetween(filteredItem, start, end) ) ?
        getNearestDivisibleOf(filteredItem, step, start) :
        getNearestTo(filteredItem, start, end);

      if ( isNaN(filteredItem) ) return;

      filteredArr.push(filteredItem);
    });

    filteredArr = filteredArr.filter( (item, i, arr) => item !== arr[i + 1] );

    if (!filteredArr.length) return;

    this._options.value = (filteredArr.length === 1) ? Number(filteredArr) : filteredArr;
  }

  get step() {
    return this._options.step;
  }
  set step(value) {
    let start = this._options.boundaries[0]; // edit: start not always equals to index[0]
    let end = this._options.boundaries[1]; // edit: end not always equals to index[1]
    let range = end - start;

    let filteredValue = parseFloat(value);

    filteredValue = ( isValueInBetween(filteredValue, 0, range) ) ?
      getNearestDividendableOf(range, filteredValue) :
      getNearestTo(filteredValue, 1, range);

    if ( isNaN(filteredValue) ) return;

    this._options.step = filteredValue;

    this.value = this._options.value;
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
