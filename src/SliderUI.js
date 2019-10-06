import {getPositionInPercentageOf, createBase, createHandle, createTooltip, createHandles, updateHandlePositions} from "./utilities";

export class SliderUI {

  create({boundaries, value, step, orientation, tooltips} = {}) {
    let base = createBase();
    let tooltipsState = tooltips;
    let values = value;
    let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

    this.handles = createHandles(positions, tooltipsState, values);

    base.append(...this.handles);

    this.sliderUI = base;
  }

  update({boundaries, values, step, orientation, tooltipsState} = {}) {

    if (values & boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      updateHandlePositions(this.handles, positions);
    }

  }

}
