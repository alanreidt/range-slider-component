export class Template {

  constructor({boundaries, values, step, orientation, hasTooltips} = {}) {
    const positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

    const handleGroups = positions.reduce( (str, position, i) => {
      const value = values[i];

      str +
      `<div class="slider__origin" style="left: ${position}">
        ${hasTooltips ? `<div class="slider__tooltip">${value}</div>` : ''}
        <div class="slider__handle"></div>
      </div>`
    }, '');

    return `<div class="slider__base">${handleGroups}</div>`;
  }

}
