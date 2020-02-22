import { ORIENTATION_VERTICAL } from '../constants';

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
} = {}) {
  return `<div class="slider js-slider ${
    orientation === ORIENTATION_VERTICAL
      ? 'slider_vertical js-slider_vertical'
      : ''
  }">
      <div class="slider__base js-slider__base">
        ${values.reduce((str, value, index) => {
          return `${str}<div class="slider__handle-group js-slider__handle-group" data-index="${index}">
            ${
              hasTooltips
                ? `<div class="slider__tooltip js-slider__tooltip"></div>`
                : ''
            }
            <div class="slider__handle js-slider__handle"></div>
          </div>`;
        }, '')}
      </div>
    </div>`;
};

export default createTemplate;
