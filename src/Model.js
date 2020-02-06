import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import sortBy from "lodash/fp/sortBy";
import filter from "lodash/fp/filter";
import identity from "lodash/fp/identity";
import isUndefined from "lodash/fp/isUndefined";

import {
  getAverageOf,
  isNumberInBetween,
  findClosestTo,
  observerMixin,
} from "./utilities";
import {
  adjustValueToStep,
  adjustToRange,
  eitherOr,
  placeBetween,
  crossWith,
} from "./helpers";

export class Model {
  constructor(newOptions = {}) {
    this._options = {
      // order matters
      boundaries: [0, 100],
      step: 1,
      values: null,
      orientation: "horizontal",
      hasTooltips: false,
    };

    this.setOptions(newOptions);

    Object.defineProperties(this._options, {
      orientation: { writable: false },
      hasTooltips: { writable: false },
    });
  }

  getOptions() {
    return this._options;
  }

  setOptions(newOptions) {
    Object.keys(this._options).forEach((key) => {
      const capitalizedKey = key[0].toUpperCase() + key.slice(1);
      const keySetterName = `_set${capitalizedKey}`;
      const value = newOptions[key];

      this[keySetterName](value);
    });

    this.triggerSubscribers("update", this.getOptions());
  }

  setValueAt(index, value) {
    const areArgumentsCorrect = Array.from(arguments).every(Number.isFinite);

    if (!areArgumentsCorrect) {
      return;
    }

    const currentValues = this._options.values;
    let newValue = value;

    if (currentValues.length === 1) {
      this.setOptions({ values: newValue });
      return;
    }

    const [prevValue, nextValue] = [
      currentValues[index - 1],
      currentValues[index + 1],
    ];

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

    const values = currentValues.slice();

    values.splice(index, 1, newValue);

    this.setOptions({ values });
  }

  _setBoundaries(values) {
    const currentValues = this._options.boundaries;
    const newValues = [].concat(values);

    this._options.boundaries = flow(
      sortBy(identity),
      map(parseFloat),
      filter(Number.isFinite),
      crossWith(currentValues),
    )(newValues);
  }

  _setValues(values) {
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
      crossWith(currentValues),
      eitherOr(defaultValue),
      map(placeBetween(start, end)),
      map(adjustValueToStep(step, offset)),
    )(newValues);
  }

  _setStep(newValue) {
    const [start, end] = this._options.boundaries;
    const range = end - start;
    const currentValue = this._options.step;

    this._options.step = flow(
      parseFloat,
      eitherOr(currentValue),
      placeBetween(1, range),
      adjustToRange(range),
    )(newValue);
  }

  _setOrientation(value) {
    if (value !== "horizontal" && value !== "vertical") return;

    this._options.orientation = value;
  }

  _setHasTooltips(value) {
    if (value !== false && value !== true) return;

    this._options.hasTooltips = value;
  }
}

Object.assign(Model.prototype, observerMixin);
