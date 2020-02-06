/**
 * Returns a string, that contains Slider DOM structure.
 *
 * @param {object} An object, which contains Slider properties.
 *
 * @returns {string}
 */
export function createTemplate({ values, orientation, hasTooltips } = {}) {
  return `<div class="slider js-slider ${
    orientation === "vertical" ? "slider_vertical js-slider_vertical" : ""
  }">
      <div class="slider__base js-slider__base">
        ${values.reduce((str, value, index) => {
          return `${str}<div class="slider__handle-group js-slider__handle-group" data-index="${index}">
            ${
              hasTooltips
                ? `<div class="slider__tooltip js-slider__tooltip"></div>`
                : ""
            }
            <div class="slider__handle js-slider__handle"></div>
          </div>`;
        }, "")}
      </div>
    </div>`;
}
