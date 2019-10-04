export class SliderUI {

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
