export class Template {

  constructor({boundaries, values, step, orientation, hasTooltips} = {}) {
    const positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

    return(
      `<div class="slider__base">
        ${positions.reduce( (str, position, i) => {
          str +
          `<div class="slider__handle-group" style="left: ${position}">
            ${hasTooltips ? `<div class="slider__tooltip">${value}</div>` : ''}
            <div class="slider__handle"></div>
          </div>`;
        }, '')}
      </div>`
    );
  }

}
