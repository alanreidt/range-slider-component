/**
 * Returns a string, that contains Slider DOM structure.
 *
 * @param {object} An object, which contains Slider properties.
 *
 * @returns {string}
 */
export function createTemplate({ values, orientation, hasTooltips } = {}) {
  return `<div class="slider ${
    orientation === "vertical" ? "slider_vertical" : ""
  }">
      <div class="slider__base">
        ${values.reduce((str) => {
          return `${str}<div class="slider__handle-group">
            ${hasTooltips ? `<div class="slider__tooltip"></div>` : ""}
            <div class="slider__handle"></div>
          </div>`;
        }, "")}
      </div>
    </div>`;
}
