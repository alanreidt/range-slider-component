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

const SLIDER_NAME = 'js-slider';
const SLIDER_BASE_NAME = 'js-slider__base';
const SLIDER_ORIENTATION_FLAG = 'js-slider_vertical';
const SLIDER_HANDLE_GROUP_NAME = 'js-slider__handle-group';
const SLIDER_TOOLTIP_NAME = 'js-slider__tooltip';
const SLIDER_HANDLE_NAME = 'js-slider__handle';

export {
  DEFAULT_OPTIONS,
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
  SLIDER_NAME,
  SLIDER_BASE_NAME,
  SLIDER_ORIENTATION_FLAG,
  SLIDER_HANDLE_GROUP_NAME,
  SLIDER_TOOLTIP_NAME,
  SLIDER_HANDLE_NAME,
};
