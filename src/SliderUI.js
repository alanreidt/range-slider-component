import {getPositionInPercentageOf, createBase, createHandle, createTooltip, createHandles, updateHandlePositions} from "./utilities";

export class SliderUI {

  create(element, {boundaries, values, step, orientation, tooltipsState} = {}) {
    let base = createBase();
    let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

    this.handles = createHandles(positions, tooltipsState, values);

    base.append(...this.handles);

    this.sliderUI = base;

    this._draw(element, orientation);
  }

  update({boundaries, values, step, orientation, tooltipsState} = {}) {

    if (values & boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      updateHandlePositions(this.handles, positions);
    }

  }

  _draw(element, orientation) {
    // add css name of the slider (change it to unique one)
    if ( !element.classList.contains("slider") ) {
      element.classList.add("slider");
    }

    if (orientation === "horizontal") {
      element.classList.add("slider_horizontal");
    }

    element.append(this.sliderUI);
  }

}
