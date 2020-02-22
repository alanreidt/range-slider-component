import { getAverageOf } from './utilities';

const DEFAULT_OPTIONS = {
  // order matters
  boundaries: [0, 100],
  step: 1,
  orientation: 'horizontal',
  hasTooltips: false,
  get values() {
    return this._values || [getAverageOf(this.boundaries)];
  },
  set values(newValues) {
    this._values = newValues;
  },
};

export default DEFAULT_OPTIONS;
