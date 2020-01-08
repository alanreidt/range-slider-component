import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import sortBy from "lodash/fp/sortBy";
import filter from "lodash/fp/filter";
import identity from "lodash/fp/identity";
import isUndefined from "lodash/fp/isUndefined";

import { getAverageOf, isNumberInBetween, findClosestTo } from "./utilities";
import {
  fallbackFalseyFP,
  packIntoFP,
  getClosestFactorOfFP,
  crossFP,
} from "./utilities/fp/utilities";
import { adjustValueToStep } from "./helpers";

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
      orientation: { writable: false },
      hasTooltips: { writable: false },
    });
  }

  get _boundaries() {
    return this._options.boundaries;
  }

  set _boundaries(values) {
    const currentValues = this._options.boundaries;
    const newValues = [].concat(values);

    this._options.boundaries = flow(
      sortBy(identity),
      map(parseFloat),
      filter(Number.isFinite),
      crossFP(currentValues),
    )(newValues);
  }

  get _values() {
    return this._options.values;
  }

  set _values(values) {
    const { step } = this._options;
    const [start, end] = this._options.boundaries;
    const offset = start;
    const defaultValue = [getAverageOf(this._options.boundaries)];

    const newValues = [].concat(values);
    const currentValues = this._options.values && this._options.values.slice();

    this._options.values = flow(
      sortBy(identity),
      map(parseFloat),
      filter(Number.isFinite),
      crossFP(currentValues),
      fallbackFalseyFP(defaultValue),
      map(packIntoFP(start, end)),
      map(adjustValueToStep(step, offset)),
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

  setValueAt(index, value) {
    const currentValues = this._options.values;
    const newValues = currentValues.slice();
    let newValue = value;
    const [prevValue, nextValue] = [
      currentValues[index - 1],
      currentValues[index + 1],
    ];

    if (currentValues.length === 1) {
      this.setOptions({ values: newValue });
      return;
    }

    if (isUndefined(prevValue)) {
      newValue = newValue < nextValue ? newValue : nextValue;
    }

    if (isUndefined(nextValue)) {
      newValue = newValue > prevValue ? newValue : prevValue;
    }

    if (!isUndefined(prevValue) && !isUndefined(nextValue)) {
      newValue = isNumberInBetween(newValue, prevValue, nextValue)
        ? newValue
        : findClosestTo(newValue, prevValue, nextValue);
    }

    newValues.splice(index, 1, newValue);

    this.setOptions({ values: newValues });
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
    Object.keys(this._options).forEach((key) => {
      this[`_${key}`] = newOptions[key];
    });

    return this.getOptions();
  }
}
