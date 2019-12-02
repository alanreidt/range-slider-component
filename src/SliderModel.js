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
      // order matters
      boundaries: [0, 100],
      step: 1,
      values: null,
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
  }


  get _values() {
    return this._options.values;
  }
  set _values(newValues) {
    const step = this._options.step;
    const [start, end] = this._options.boundaries;

    newValues = [].concat(newValues);
    const currentValues = this._options.values &&
      this._options.values.slice();

    let validatedValues = newValues
                            .sort( (a, b) => a - b )
                            .map( parseFloat )
                            .filter( isFinite );

    validatedValues = uniquify( validatedValues );

    validatedValues = cross(currentValues, validatedValues);

    validatedValues = (validatedValues === null) ?
      Array.of( getAverageOf(this._options.boundaries) ) :
      validatedValues;

    validatedValues = validatedValues
                        .map( (value) => packInto(value, start, end) )
                        .map( (value) => getNearestDivisibleOf(value, step, start) );

    this._options.values = validatedValues;
  }


  get _step() {
    return this._options.step;
  }
  set _step(value) {
    const [start, end] = this._options.boundaries;
    const range = end - start;

    const currentValue = this._options.step;

    let validatedValue = parseFloat(value);

    validatedValue = isNaN(validatedValue) ? currentValue :
      validatedValue;

    validatedValue = packInto(validatedValue, 1, range);
    validatedValue = getClosestFactorOf(range, validatedValue);

    this._options.step = validatedValue;
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
