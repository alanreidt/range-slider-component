import {getPositionInPercentageOf, createBase, createHandle, createTooltip} from "./utilities";

export class SliderUI {

  createSliderUI({boundaries, values, step, orientation, tooltipsState} = {}) {
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

  updateSliderUI({boundaries, values, step, orientation, tooltipsState} = {}) {

    if (values) {
      values.forEach( (value, i) => {
        let handlePosition = getPositionInPercentageOf(value, boundaries);
        let handle = this.handles[i];

        handle.style.transform = `translate3d(${handlePosition}, 0, 0)`;
      });
    }

  }

}
