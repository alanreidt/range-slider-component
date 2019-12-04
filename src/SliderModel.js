import {
  getAverageOf,
  getNearestDivisibleOf,
  getClosestFactorOf,
  packInto,
  uniquify,
  cross,
  isValueInBetween,
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
  set _boundaries(newValues) {
    const currentValues = this._options.boundaries.slice();
    newValues = [].concat(newValues);

    let validatedValues = newValues
                            .sort( (a, b) => a - b )
                            .map( parseFloat )
                            .filter( isFinite );

    validatedValues = cross(currentValues, validatedValues);

    this._options.boundaries = validatedValues;
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
  set _step(newValue) {
    const [start, end] = this._options.boundaries;
    const range = end - start;
    const currentValue = this._options.step;

    let validatedValue = parseFloat(newValue);

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


  setHandle(index, newValue) {
    const currentValues = this._options.values;
    const newValues = currentValues.slice();

    const prevValue = currentValues[index - 1];
    const nextValue = currentValues[index + 1];

    if ( !prevValue ) {
      newValue = ( newValue < nextValue ) ?
        newValue : nextValue;
    }

    if ( !nextValue ) {
      newValue = ( newValue > prevValue ) ?
        newValue : prevValue;
    }

    if ( prevValue && nextValue ) {
      newValue = isValueInBetween(newValue, prevValue, nextValue) ?
        newValue :
        getNearestTo(newValue, prevValue, nextValue);
    }

    newValues.splice(index, 1, newValue);

    this.setValues( {values: newValues} );
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
