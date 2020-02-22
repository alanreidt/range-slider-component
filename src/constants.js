import { getAverageOf } from './utilities';

const ORIENTATION_HORIZONTAL = 'horizontal';
const ORIENTATION_VERTICAL = 'vertical';

const DEFAULT_OPTIONS = {
  // order matters
  boundaries: [0, 100],
  step: 1,
  orientation: ORIENTATION_HORIZONTAL,
  hasTooltips: true,
  get values() {
    return this._values || [getAverageOf(this.boundaries)];
  },
  set values(newValues) {
    this._values = newValues;
  },
};

export { DEFAULT_OPTIONS, ORIENTATION_HORIZONTAL, ORIENTATION_VERTICAL };
