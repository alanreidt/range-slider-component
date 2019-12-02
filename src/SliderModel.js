import {
  getAverageOf,
  getNearestDivisibleOf,
  isValueBetween,
  getNearestTo,
  getClosestFactorOf,
  packInto,
  uniquify,
  cross,
} from "../src/utilities/utilities.js";


export class SliderModel {
  constructor(options = {}) {
    this._options = {
      boundaries: [0, 100],
      values: null,
      step: 1,
      orientation: "horizontal",
      hasTooltips: false,
    };

    this.setValues(options);

    Object.defineProperties(this._options, {
      orientation: {writable: false},
      hasTooltips: {writable: false},
    });
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
    return this._options.values;
  }
  set _values(values) {
    const currentValues = this._options.values && this._options.values.slice();
    const newValues = [].concat(values);
    const step = this._options.step;
    const [start, end] = this._options.boundaries;

    let validatedValues = newValues
                            .sort( (a, b) => a - b )
                            .map( parseFloat )
                            .filter( isFinite )
                            .map( (value) => packInto(value, start, end) )
                            .map( (value) => getNearestDivisibleOf(value, step, start) );

    validatedValues = cross(currentValues, validatedValues);

    validatedValues = (validatedValues === null) ?
      Array.of( getAverageOf(this._options.boundaries) ) :
      validatedValues;

    this._options.values = uniquify( validatedValues );
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
      boundaries: this._boundaries,
      values: this._values,
      step: this._step,
      orientation: this._orientation,
      hasTooltips: this._hasTooltips,
    };
  }


  setValues(options) {
    for ( let key of Object.keys(this._options) ) {
      this["_" + key] = options[key];
    }

    return this.getValues();
  }

}
