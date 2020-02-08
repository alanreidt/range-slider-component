import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import sortBy from "lodash/fp/sortBy";
import filter from "lodash/fp/filter";
import identity from "lodash/fp/identity";

import {
  getAverageOf,
  observerMixin,
  restrictNumberByNeighbors,
  replaceAt,
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

    const [prevValue, nextValue] = [
      currentValues[index - 1],
      currentValues[index + 1],
    ];

    const newValue = restrictNumberByNeighbors(value, prevValue, nextValue);

    const values = replaceAt(index, newValue, currentValues);

    this.setOptions({ values });
  }

  _setBoundaries(values) {
    const currentValues = this._options.boundaries;
    const newValues = [].concat(values);

    const validate = flow(
      sortBy(identity),
      map(parseFloat),
      filter(Number.isFinite),
      crossWith(currentValues),
    );

    this._options.boundaries = validate(newValues);
  }

  _setValues(values) {
    const { step } = this._options;
    const [start, end] = this._options.boundaries;
    const offset = start;
    const defaultValue = [getAverageOf(this._options.boundaries)];

    const newValues = [].concat(values);
    const currentValues = this._options.values && this._options.values.slice();

    const validate = flow(
      map(parseFloat),
      filter(Number.isFinite),
      sortBy(identity),
      crossWith(currentValues),
      eitherOr(defaultValue),
      map(placeBetween(start, end)),
      map(adjustValueToStep(step, offset)),
    );

    this._options.values = validate(newValues);
  }

  _setStep(newValue) {
    const [start, end] = this._options.boundaries;
    const range = end - start;
    const currentValue = this._options.step;

    const validate = flow(
      parseFloat,
      eitherOr(currentValue),
      placeBetween(1, range),
      adjustToRange(range),
    );

    this._options.step = validate(newValue);
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
