import {getAverageOf, getNearestDivisibleOf, isValueInBetween, getNearestTo, getClosestFactorOf} from "./utilities";

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
    let result = this._options.boundaries.slice();

    if (typeof(value) === "number") {
      let [start, end] = result;

      let filteredValue = parseFloat(value);

      if ( isNaN(filteredValue) ) return;

      result = ( getNearestTo(filteredValue, start, end) === start ) ?
        [filteredValue, end] : [start, filteredValue];
    }

    if ( Array.isArray(value) ) {

      for (let i = 0; i < result.length; i++) {
        let filteredValue = parseFloat( value[i] );

        if ( isNaN(filteredValue) ) continue;

        result[i] = filteredValue;
      }

    }

    this._options.boundaries = result.sort( (a, b) => a - b );

    this.value = this._options.value;
    this.step = this._options.step;
  }

  get value() {
    return this._options.value || getAverageOf(this._options.boundaries);
  }
  set value(values) {
    let arrOfValues = [].concat(values);
    let filteredArr = [];
    let step = this._options.step;
    let [start, end] = this._options.boundaries;

    arrOfValues.sort( (a, b) => a - b ).forEach(value => {
      let filteredValue = parseFloat(value);

      filteredValue = ( isValueInBetween(filteredValue, start, end) ) ?
        getNearestDivisibleOf(filteredValue, step, start) :
        getNearestTo(filteredValue, start, end);

      if ( isNaN(filteredValue) ) return;

      filteredArr.push(filteredValue);
    });

    filteredArr = filteredArr.filter( (item, i, filteredArr) => item !== filteredArr[i + 1] );

    if (!filteredArr.length) return;

    this._options.value = (filteredArr.length === 1) ? Number(filteredArr) : filteredArr;
  }

  get step() {
    return this._options.step;
  }
  set step(value) {
    let [start, end] = this._options.boundaries;
    let range = end - start;

    let filteredValue = parseFloat(value);

    filteredValue = ( isValueInBetween(filteredValue, 1, range) ) ?
      getClosestFactorOf(range, filteredValue) :
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

  getValues() {

    return {
      boundaries: this.boundaries,
      value: this.value,
      step: this.step,
      orientation: this.orientation,
      tooltips: this.tooltips,
    };

  }
}
