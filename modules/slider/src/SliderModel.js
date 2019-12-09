import {
  getAverageOf,
  isValueInBetween,
  getNearestTo,
} from "../src/utilities/utilities.js";

import {
  fallbackFalseyFP,
  packIntoFP,
  getClosestFactorOfFP,
  crossFP,
  getNearestDivisibleOfFP
} from "./utilities/fp/utilities.js";

const flow = require("lodash/fp/flow");
const map = require("lodash/fp/map");
const sortBy = require("lodash/fp/sortBy");
const filter = require("lodash/fp/filter");
const identity = require("lodash/fp/identity");
const isUndefined = require("lodash/fp/isUndefined");


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

    this.setOptions(options);

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

    this._options.boundaries = flow(
      sortBy( identity ),
      map( parseFloat ),
      filter( isFinite ),
      crossFP( currentValues ),
    )(newValues);
  }


  get _values() {
    return this._options.values;
  }
  set _values(newValues) {
    const step = this._options.step;
    const [start, end] = this._options.boundaries;
    const defaultValue = [
      getAverageOf(this._options.boundaries),
    ];

    newValues = [].concat(newValues);
    const currentValues = this._options.values &&
      this._options.values.slice();

    this._options.values = flow(
      sortBy( identity ),
      map( parseFloat ),
      filter( isFinite ),
      crossFP( currentValues ),
      fallbackFalseyFP( defaultValue ),
      map( packIntoFP(start, end) ),
      map( getNearestDivisibleOfFP(step, start) ),
    )(newValues);
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


  setValueAt(index, newValue) {
    const currentValues = this._options.values;
    const newValues = currentValues.slice();
    const [prevValue, nextValue] = [
      currentValues[index - 1],
      currentValues[index + 1]
    ];

    if (currentValues.length === 1) {
      this.setOptions( {values: newValue} );
      return;
    }

    if ( isUndefined(prevValue) ) {
      newValue = ( newValue < nextValue ) ?
        newValue : nextValue;
    }

    if ( isUndefined(nextValue) ) {
      newValue = ( newValue > prevValue ) ?
        newValue : prevValue;
    }

    if ( !isUndefined(prevValue) && !isUndefined(nextValue) ) {
      newValue = isValueInBetween(newValue, prevValue, nextValue) ?
        newValue :
        getNearestTo(newValue, prevValue, nextValue);
    }

    newValues.splice(index, 1, newValue);

    this.setOptions( {values: newValues} );
  }


  getOptions() {
    return {
      boundaries: this._boundaries,
      values: this._values,
      step: this._step,
      orientation: this._orientation,
      hasTooltips: this._hasTooltips,
    };
  }


  setOptions(newOptions) {
    for ( let key of Object.keys(this._options) ) {
      this["_" + key] = newOptions[key];
    }

    return this.getOptions();
  }

}
