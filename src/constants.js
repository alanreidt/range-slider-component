import { withNaming } from '@bem-react/classname';

import { getAverageOf } from '../modules/utilities';

const ORIENTATION_HORIZONTAL = 'horizontal';
const ORIENTATION_VERTICAL = 'vertical';
const THEME_MODERN = 'modern';

const DEFAULT_OPTIONS = {
  // order matters
  boundaries: [0, 100],
  step: 1,
  orientation: ORIENTATION_HORIZONTAL,
  hasTooltips: true,
  hasScale: false,
  theme: false,
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
const SCALE_NAME = 'scale';

const className = withNaming({ e: '__', m: '_', v: '_' });
const composeSliderElementClassName = className(SLIDER_NAME);

const SLIDER_VERTICAL_CLASS_NAME = composeSliderElementClassName({
  [ORIENTATION_FLAG_NAME]: true,
});
const HANDLE_GROUP_CLASS_NAME = composeSliderElementClassName(
  HANDLE_GROUP_NAME,
);
const BASE_CLASS_NAME = composeSliderElementClassName(BASE_NAME);
const TOOLTIP_CLASS_NAME = composeSliderElementClassName(TOOLTIP_NAME);
const HANDLE_CLASS_NAME = composeSliderElementClassName(HANDLE_NAME);
const SCALE_CLASS_NAME = composeSliderElementClassName(SCALE_NAME);

const jsClassName = withNaming({ n: 'js-', e: '__', m: '_', v: '_' });
const composeSliderElementJSClassName = jsClassName(SLIDER_NAME);

const JS_SLIDER_VERTICAL_CLASS_NAME = composeSliderElementJSClassName({
  [ORIENTATION_FLAG_NAME]: true,
});
const JS_HANDLE_GROUP_CLASS_NAME = composeSliderElementJSClassName(
  HANDLE_GROUP_NAME,
);
const JS_SLIDER_CLASS_NAME = composeSliderElementJSClassName();
const JS_BASE_CLASS_NAME = composeSliderElementJSClassName(BASE_NAME);
const JS_TOOLTIP_CLASS_NAME = composeSliderElementJSClassName(TOOLTIP_NAME);
const JS_HANDLE_CLASS_NAME = composeSliderElementJSClassName(HANDLE_NAME);
const JS_SCALE_CLASS_NAME = composeSliderElementJSClassName(SCALE_NAME);

const JS_SLIDER_SELECTOR = `.${JS_SLIDER_CLASS_NAME}`;
const JS_SLIDER_VERTICAL_SELECTOR = `.${JS_SLIDER_VERTICAL_CLASS_NAME}`;
const JS_BASE_SELECTOR = `.${JS_BASE_CLASS_NAME}`;
const JS_HANDLE_GROUP_SELECTOR = `.${JS_HANDLE_GROUP_CLASS_NAME}`;
const JS_TOOLTIP_SELECTOR = `.${JS_TOOLTIP_CLASS_NAME}`;
const JS_HANDLE_SELECTOR = `.${JS_HANDLE_CLASS_NAME}`;
const JS_SCALE_SELECTOR = `.${JS_SCALE_CLASS_NAME}`;

export {
  composeSliderElementClassName,
  DEFAULT_OPTIONS,
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
  THEME_MODERN,
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
  SCALE_CLASS_NAME,
  JS_SLIDER_CLASS_NAME,
  JS_SLIDER_VERTICAL_CLASS_NAME,
  JS_BASE_CLASS_NAME,
  JS_HANDLE_GROUP_CLASS_NAME,
  JS_TOOLTIP_CLASS_NAME,
  JS_HANDLE_CLASS_NAME,
  JS_SCALE_CLASS_NAME,
  JS_SLIDER_SELECTOR,
  JS_SLIDER_VERTICAL_SELECTOR,
  JS_BASE_SELECTOR,
  JS_HANDLE_GROUP_SELECTOR,
  JS_TOOLTIP_SELECTOR,
  JS_HANDLE_SELECTOR,
  JS_SCALE_SELECTOR,
};
