import {
  ORIENTATION_VERTICAL,
  JS_SLIDER_CLASS_NAME,
  JS_BASE_CLASS_NAME,
  JS_HANDLE_GROUP_CLASS_NAME,
  JS_TOOLTIP_CLASS_NAME,
  SLIDER_NAME,
  SLIDER_VERTICAL_CLASS_NAME,
  BASE_CLASS_NAME,
  HANDLE_GROUP_CLASS_NAME,
  TOOLTIP_CLASS_NAME,
  HANDLE_CLASS_NAME,
} from '../constants';
import { findNextFactor, isDivisible } from '../../modules/utilities';

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
  boundaries,
  values,
  step,
  orientation,
  hasTooltips,
} = {}) {
  const [min, max] = boundaries;
  const range = max - min;
  const minimalDensity = 24;

  let scaleStep = step;
  let scaleValuesQuantity = range / step + 1;
  let currentDensity = 276 / scaleValuesQuantity - 1;

  while (
    currentDensity < minimalDensity ||
    (!isDivisible(scaleStep, step) && scaleStep < range)
  ) {
    scaleStep = findNextFactor(range, scaleStep + 1);

    scaleValuesQuantity = range / scaleStep + 1;
    currentDensity = 276 / scaleValuesQuantity - 1;
  }

  const scaleValues = new Array(scaleValuesQuantity)
    .fill(min)
    .map((value, index) => index * scaleStep + value);

  return `<div class="${JS_SLIDER_CLASS_NAME} ${
    orientation === ORIENTATION_VERTICAL
      ? SLIDER_VERTICAL_CLASS_NAME
      : SLIDER_NAME
  }">
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
      </div>
      <div class="scale js-scale">
        ${scaleValues.reduce((str, value) => {
          return `${str}<div class="scale__segment">
            <span class="scale__pip"></span>
            <span class="scale__value">${value}</span>
          </div>`;
        }, '')}
      </div>
    </div>`;
};

export default createTemplate;
