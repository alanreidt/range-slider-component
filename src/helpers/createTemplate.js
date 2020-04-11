import {
  composeSliderClassName,
  ORIENTATION_VERTICAL,
  JS_SLIDER_CLASS_NAME,
  JS_BASE_CLASS_NAME,
  JS_HANDLE_GROUP_CLASS_NAME,
  JS_TOOLTIP_CLASS_NAME,
  JS_SCALE_CLASS_NAME,
  BASE_CLASS_NAME,
  HANDLE_GROUP_CLASS_NAME,
  TOOLTIP_CLASS_NAME,
  HANDLE_CLASS_NAME,
  SCALE_CLASS_NAME,
  ORIENTATION_FLAG_NAME,
} from '../constants';

/**
 * Returns a string, that contains Slider DOM structure.
 *
 * @param {object} options Object, which contains Slider properties.
 * @param {number[]} options.values
 * @param {string} options.orientation
 * @param {boolean} options.hasTooltips
 *
 * @returns {string} Slider DOM structure.
 */
const createTemplate = function createTemplateFromHelpers({
  values,
  orientation,
  hasTooltips,
  hasScale,
  theme,
} = {}) {
  const isVertical = orientation === ORIENTATION_VERTICAL;
  const sliderClassName = composeSliderClassName({
    [ORIENTATION_FLAG_NAME]: isVertical,
    theme,
  });

  return `<div class="${sliderClassName} ${JS_SLIDER_CLASS_NAME}">
      <div class="${BASE_CLASS_NAME} ${JS_BASE_CLASS_NAME}">
        ${values.reduce((str, value, index) => {
          return `${str}<div class="${HANDLE_GROUP_CLASS_NAME} ${JS_HANDLE_GROUP_CLASS_NAME}" data-index="${index}">
            ${
              hasTooltips
                ? `<div class="${TOOLTIP_CLASS_NAME} ${JS_TOOLTIP_CLASS_NAME}"></div>`
                : ''
            }
            <div class="${HANDLE_CLASS_NAME}"></div>
          </div>`;
        }, '')}
        ${
          hasScale
            ? `<div class="${SCALE_CLASS_NAME} ${JS_SCALE_CLASS_NAME}"></div>`
            : ''
        }
        <div class="slider__connector js-slider__connector"></div>
      </div>
    </div>`;
};

export default createTemplate;
