import {
  getAverageOf,
  getNearestDivisibleOf,
  getClosestFactorOf,
  packInto,
  uniquify,
  cross,
  isValueInBetween,
  getNearestTo,
  fallbackFalsey,
} from "../src/utilities/utilities.js";

import {
  fallbackFalseyFP,
  packIntoFP,
  getClosestFactorOfFP
} from "./utilities/fp/utilities.js";

const flow = require("lodash/flow");
const curry = require("lodash/curry");
const map = require("lodash/fp/map");
const sortBy = require("lodash/fp/sortBy");
const filter = require("lodash/fp/filter");
const identity = require("lodash/fp/identity");


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
    const currentValues = this._options.boundaries;
    newValues = [].concat(newValues);
    const crossCurried = curry(cross);

    this._options.boundaries = flow(
      sortBy( identity ),
      map( parseFloat ),
      filter( isFinite ),
      crossCurried( currentValues ),
    )(newValues);
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

    this._options.step = flow(
      parseFloat,
      fallbackFalseyFP(currentValue),
      packIntoFP(1, range),
      getClosestFactorOfFP(range),
    )(newValue);
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
