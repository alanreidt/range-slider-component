import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import filter from 'lodash/fp/filter';
import identity from 'lodash/fp/identity';

import { ObserverMixin } from '../../modules/utilities';
import {
  adjustToStep,
  adjustToRange,
  eitherOr,
  placeBetween,
  crossWith,
  restrictByNeighbors,
  replaceAt,
} from '../helpers';
import {
  DEFAULT_OPTIONS,
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
} from '../constants';

class Model {
  constructor(newOptions = {}) {
    this.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    this._options = Object.create(DEFAULT_OPTIONS);

    this.setOptions(newOptions);
  }

  getOptions() {
    const options = this._options;
    const optionsCopy = {};

    Object.keys(this.DEFAULT_OPTIONS).forEach((key) => {
      const value = options[key];

      optionsCopy[key] = Array.isArray(value) ? value.slice() : value;
    });

    return optionsCopy;
  }

  setOptions(newOptions) {
    Object.keys(this.DEFAULT_OPTIONS).forEach((key) => {
      const keyFirstLetter = key[0];
      const isKeyPrivate = keyFirstLetter === '_';

      if (isKeyPrivate) return;

      const capitalizedKey = keyFirstLetter.toUpperCase() + key.slice(1);
      const keySetterName = `_set${capitalizedKey}`;
      const value = newOptions[key];

      this[keySetterName](value);
    });

    this.triggerSubscribers('update', this.getOptions());

    return this;
  }

  setValueAt(index, value) {
    const currentValues = this._options.values;
    const isIndexExceeded = index > currentValues.length || index < 0;

    if (isIndexExceeded) return;

    const [prevValue, nextValue] = [
      currentValues[index - 1],
      currentValues[index + 1],
    ];

    const values = flow(
      parseFloat,
      restrictByNeighbors(prevValue, nextValue),
      replaceAt(index, currentValues),
    )(value);

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
    const defaultValue = this._options.values;

    const newValues = [].concat(values);
    const currentValues = this._options._values;

    const validate = flow(
      map(parseFloat),
      filter(Number.isFinite),
      sortBy(identity),
      crossWith(currentValues),
      eitherOr(defaultValue),
      map(placeBetween(start, end)),
      map(adjustToStep(step, offset)),
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

  _setOrientation(newValue) {
    const currentValue = this._options.orientation;

    if (Object.prototype.hasOwnProperty.call(this._options, 'orientation')) {
      return;
    }

    const isValueValid =
      newValue === ORIENTATION_HORIZONTAL || newValue === ORIENTATION_VERTICAL;

    this._options.orientation = isValueValid ? newValue : currentValue;
  }

  _setHasTooltips(newValue) {
    const currentValue = this._options.hasTooltips;

    if (Object.prototype.hasOwnProperty.call(this._options, 'hasTooltips')) {
      return;
    }

    this._options.hasTooltips =
      typeof newValue === 'boolean' ? newValue : currentValue;
  }
}

Object.assign(Model.prototype, ObserverMixin);

export default Model;
