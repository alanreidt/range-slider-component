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

const SLIDER_NAME = 'slider';
const ORIENTATION_FLAG_NAME = 'vertical';
const BASE_NAME = 'base';
const HANDLE_GROUP_NAME = 'handle-group';
const TOOLTIP_NAME = 'tooltip';
const HANDLE_NAME = 'handle';

const SLIDER_VERTICAL_CLASS_NAME = 'slider_vertical';
const BASE_CLASS_NAME = 'slider__base';
const HANDLE_GROUP_CLASS_NAME = 'slider__handle-group';
const TOOLTIP_CLASS_NAME = 'slider__tooltip';
const HANDLE_CLASS_NAME = 'slider__handle';

const JS_SLIDER_CLASS_NAME = 'js-slider';
const JS_SLIDER_VERTICAL_CLASS_NAME = 'js-slider_vertical';
const JS_BASE_CLASS_NAME = 'js-slider__base';
const JS_HANDLE_GROUP_CLASS_NAME = 'js-slider__handle-group';
const JS_TOOLTIP_CLASS_NAME = 'js-slider__tooltip';
const JS_HANDLE_CLASS_NAME = 'js-slider__handle';

const JS_SLIDER_SELECTOR = '.js-slider';
const JS_SLIDER_VERTICAL_SELECTOR = '.js-slider_vertical';
const JS_BASE_SELECTOR = '.js-slider__base';
const JS_HANDLE_GROUP_SELECTOR = '.js-slider__handle-group';
const JS_TOOLTIP_SELECTOR = '.js-slider__tooltip';
const JS_HANDLE_SELECTOR = '.js-slider__handle';

export {
  DEFAULT_OPTIONS,
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
  SLIDER_NAME,
  ORIENTATION_FLAG_NAME,
  BASE_NAME,
  HANDLE_GROUP_NAME,
  TOOLTIP_NAME,
  HANDLE_NAME,
  SLIDER_VERTICAL_CLASS_NAME,
  BASE_CLASS_NAME,
  HANDLE_GROUP_CLASS_NAME,
  TOOLTIP_CLASS_NAME,
  HANDLE_CLASS_NAME,
  JS_SLIDER_CLASS_NAME,
  JS_SLIDER_VERTICAL_CLASS_NAME,
  JS_BASE_CLASS_NAME,
  JS_HANDLE_GROUP_CLASS_NAME,
  JS_TOOLTIP_CLASS_NAME,
  JS_HANDLE_CLASS_NAME,
  JS_SLIDER_SELECTOR,
  JS_SLIDER_VERTICAL_SELECTOR,
  JS_BASE_SELECTOR,
  JS_HANDLE_GROUP_SELECTOR,
  JS_TOOLTIP_SELECTOR,
  JS_HANDLE_SELECTOR,
};
