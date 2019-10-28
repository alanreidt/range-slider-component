import {getPositionInPercentageOf, createBase, createHandle, createTooltip, createHandles, updateHandlePositions, composeHandleGroup, composeHandleGroups} from "./utilities";

export class SliderUI {

  constructor(parent, dataSource) {
    this.parent = parent;
    this.dataSource = dataSource;

    this.create( dataSource.getValues() );
  }

  create({boundaries, values, step, orientation, hasTooltips} = {}) {
    let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );
    let base = createBase();

    ({
      handleGroups: this.handleGroups,
      handles: this.handles,
      tooltips: this.tooltips,
    } = composeHandleGroups(positions, hasTooltips, values) );

    base.append(...this.handleGroups);

    this.template = base;

    this._draw(orientation);
  }

  update({boundaries, values, step, orientation, hasTooltips} = {}) {

    if (values & boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      this._updateHandleGroupPositions(positions)
    }

  }

  _draw(orientation) {
    // add css name of the slider (change it to unique one)
    if ( !this.parent.classList.contains("slider") ) {
      this.parent.classList.add("slider");
    }

    if (orientation === "vertical") {
      this.parent.classList.add("slider_vertical");
    }

    this.parent.append(this.template);
  }

  _updateHandleGroupPositions(positions) {
    setElementPositions(this.handleGroups, positions);
  }

}
