import {getAverageOf, getNearestDivisibleOf, isValueBetween, getNearestTo, getClosestFactorOf} from "./utilities";

export class Slider {
  // don't use object destructuring as
  // I need to loop over an object
  constructor(options = {}) {
    // Assign default values directly in order
    // to avoid their redundant pass through setters
    this._options = {
      boundaries: [0, 100],
      values: null,
      step: 1,
      orientation: "horizontal",
      hasTooltips: false,
    };

    for (let key in this._options) {
      if ( options[key] === undefined ) continue;
      this[key] = options[key];
    }
  }

  get _boundaries() {
    return this._options.boundaries;
  }
  set _boundaries(value) {
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

    this._values = this._options.values;
    this._step = this._options.step;
  }

  get _values() {
    return this._options.values || Array.of( getAverageOf(this._options.boundaries) );
  }
  set _values(values) {
    const currentValues = this._options.values && this._options.values.slice();
    let newValues = [].concat(values);
    let filteredArr = [];
    let step = this._options.step;
    let [start, end] = this._options.boundaries;

    newValues.sort( (a, b) => a - b ).forEach(value => {
      let filteredValue = parseFloat(value);

      filteredValue = ( isValueBetween(filteredValue, start, end) ) ?
        getNearestDivisibleOf(filteredValue, step, start) :
        getNearestTo(filteredValue, start, end);

      if ( isNaN(filteredValue) ) return;

      filteredArr.push(filteredValue);
    });

    filteredArr = filteredArr.filter( (item, i, filteredArr) => item !== filteredArr[i + 1] );

    if (!filteredArr.length) return;

    if (!currentValues || filteredArr.length === currentValues.length) {
      this._options.values = filteredArr;
      return;
    }

    if (filteredArr.length > currentValues.length) {
      filteredArr.length = currentValues.length;
    } else {
      filteredArr.forEach( (item) => {
        const closestValue = getNearestTo(item, ...currentValues);
        const closestValuePosition = currentValues.indexOf(closestValue);

        currentValues.splice(closestValuePosition, 1, item);
      });

      filteredArr = currentValues;
    }

    this._options.values = filteredArr;
  }

  get _step() {
    return this._options.step;
  }
  set _step(value) {
    let [start, end] = this._options.boundaries;
    let range = end - start;

    let filteredValue = parseFloat(value);

    filteredValue = ( isValueBetween(filteredValue, 1, range) ) ?
      getClosestFactorOf(range, filteredValue) :
      getNearestTo(filteredValue, 1, range);

    if ( isNaN(filteredValue) ) return;

    this._options.step = filteredValue;

    this._values = this._options.values;
  }

  get _orientation() {
    return this._options.orientation;
  }
  set _orientation(value) {
    if (value !== "horizontal" && value !== "vertical") return;

    this._options.orientation = value;
  }

  get _hasTooltips() {
    return this._options.hasTooltips;
  }
  set _hasTooltips(value) {
    if (value !== false && value !== true) return;

    this._options.hasTooltips = value;
  }

  getValues() {

    return {
      boundaries: this.boundaries,
      values: this.values,
      step: this.step,
      orientation: this.orientation,
      hasTooltips: this.hasTooltips,
    };

  }

  setValues(options) {
    for ( let key of Object.keys(options) ) {
      this["_" + key] = options[key];
    }

    return this.getValues();
  }

}
