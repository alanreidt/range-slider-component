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

const HAS_TOOLTIPS = true;
const ORIENTATION_HORIZONTAL = 'horizontal';
const ORIENTATION_VERTICAL = 'vertical';

export {
  DEFAULT_OPTIONS,
  HAS_TOOLTIPS,
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
};
