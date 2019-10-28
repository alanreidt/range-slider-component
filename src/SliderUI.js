import {getPositionInPercentageOf, createBase, createHandle, createTooltip, createHandles, updateHandlePositions, composeHandleGroup, setElementPositions, composeHandleGroups} from "./utilities";

export class SliderUI {

  constructor(parent, dataSource, template) {
    this.parent = parent;
    this.dataSource = dataSource;
    this.template = template;
  }


  update({boundaries, values, step, orientation, hasTooltips} = {}) {

    if (values && boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      this._updateHandleGroupPositions(positions)
    }

  }


  paint(orientation) {
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
