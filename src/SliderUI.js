import {getPositionInPercentageOf, createBase, createHandle, createTooltip, updateHandlePositions} from "./utilities";

export class SliderUI {

  create({boundaries, values, step, orientation, tooltipsState} = {}) {
    let base = createBase();
    this.handles = [];
    this.tooltips = [];

    values.forEach( (value) => {
      let handlePosition = getPositionInPercentageOf(value, boundaries);
      let handle = createHandle(handlePosition);
      let tooltip = null;

      if (tooltipsState) {
        tooltip = createTooltip(value);
        this.tooltips.push(tooltip);

        handle.append(tooltip);
      }

      this.handles.push(handle);
      base.append(handle);
    });

    this.sliderUI = base;
  }

  update({boundaries, values, step, orientation, tooltipsState} = {}) {

    if (values & boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      updateHandlePositions(this.handles, positions);
    }

  }

}
