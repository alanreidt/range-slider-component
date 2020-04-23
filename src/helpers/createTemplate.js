import {
  composeSliderClassName,
  JS_SLIDER_CLASS_NAME,
  JS_BASE_CLASS_NAME,
  JS_HANDLE_GROUP_CLASS_NAME,
  JS_TOOLTIP_CLASS_NAME,
  JS_SCALE_CLASS_NAME,
  JS_CONNECTOR_CLASS_NAME,
  BASE_CLASS_NAME,
  HANDLE_GROUP_CLASS_NAME,
  TOOLTIP_CLASS_NAME,
  HANDLE_CLASS_NAME,
  SCALE_CLASS_NAME,
  CONNECTOR_CLASS_NAME,
  VERTICAL_FLAG_NAME,
  THEME_FLAG_NAME,
} from '../constants';

/**
 * Returns a string, that contains Slider DOM structure.
 *
 * @param {object} options Object, which contains Slider properties.
 * @param {number[]} options.values
 * @param {string} options.isVertical
 * @param {boolean} options.hasTooltips
 *
 * @returns {string} Slider DOM structure.
 */
const createTemplate = function createTemplateFromHelpers({
  values,
  isVertical,
  hasTooltips,
  hasScale,
  hasConnector,
  theme,
} = {}) {
  const sliderClassName = composeSliderClassName({
    [VERTICAL_FLAG_NAME]: isVertical,
    [THEME_FLAG_NAME]: theme,
  });

  return `
    <div class="${sliderClassName} ${JS_SLIDER_CLASS_NAME}">
      <div class="${BASE_CLASS_NAME} ${JS_BASE_CLASS_NAME}">
        ${values.reduce((str, value, index) => {
          return `
          ${str}<div class="${HANDLE_GROUP_CLASS_NAME} ${JS_HANDLE_GROUP_CLASS_NAME}" data-index="${index}">
            ${
              hasTooltips
                ? `<div class="${TOOLTIP_CLASS_NAME} ${JS_TOOLTIP_CLASS_NAME}"></div>`
                : ''
            }
            <div class="${HANDLE_CLASS_NAME}"></div>
          </div>`.trim();
        }, '')}
        ${
          hasScale
            ? `<div class="${SCALE_CLASS_NAME} ${JS_SCALE_CLASS_NAME}"></div>`
            : ''
        }
        ${
          hasConnector
            ? `<div class="${CONNECTOR_CLASS_NAME} ${JS_CONNECTOR_CLASS_NAME}"></div>`
            : ''
        }
      </div>
    </div>`.trim();
};

export default createTemplate;
