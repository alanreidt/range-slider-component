import {getPositionInPercentageOf, createBase, createHandle, createTooltip, createHandles, updateHandlePositions} from "./utilities";

export class SliderUI {

  create({boundaries, values, step, orientation, tooltipsState} = {}) {
    let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );
    let handlesTemplate = positions.reduce( (str, position, i) => {
      str + `<div class="slider__origin" style="left: ${position}">
        <div class="slider__tooltip">${values[i]}</div>
        <div class="slider__handle"></div>
      </div>`
    }, '');

    return `<div class="slider__base">${handlesTemplate}</div>`;
  }

  update({boundaries, values, step, orientation, tooltipsState} = {}) {

    if (values & boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      updateHandlePositions(this.handles, positions);
    }

  }

}
