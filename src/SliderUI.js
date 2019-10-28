import {getPositionInPercentageOf, createBase, createHandle, createTooltip, createHandles, updateHandlePositions, composeHandleGroup, setElementPositions, composeHandleGroups} from "./utilities";

export class SliderUI {

  constructor(parent, dataSource) {
    this.parent = parent;
    this.dataSource = dataSource;

    this.create( dataSource.getValues() );
  }


  create({boundaries, values, step, orientation, hasTooltips} = {}) {
    let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );
    let handlesTemplate = positions.reduce( (str, position, i) => {
      str + `<div class="slider__origin" style="left: ${position}">
        <div class="slider__tooltip">${values[i]}</div>
        <div class="slider__handle"></div>
      </div>`
    }, '');

    return `<div class="slider__base">${handlesTemplate}</div>`;

    this._draw(orientation);
  }


  update({boundaries, values, step, orientation, hasTooltips} = {}) {

    if (values && boundaries) {
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
