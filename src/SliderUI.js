import {getPositionInPercentageOf, setElementsPosition, setElementsTextContent} from "./utilities";

export class SliderUI {

  constructor(parent) {
    this.parent = parent;
  }


  update({boundaries, values, step, orientation, hasTooltips} = {}) {

    if (values && boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      this._updateHandleGroups(positions)
      this._updateTooltips(values)
    }

  }


  paint({boundaries, values, step, orientation, hasTooltips} = {}) {
    // add css name of the slider (change it to unique one)
    if ( !this.parent.classList.contains("slider") ) {
      this.parent.classList.add("slider");
    }

    if (orientation === "vertical") {
      this.parent.classList.add("slider_vertical");
    }

    const defaultTemplate = this.template.createDefault({
      boundaries,
      values,
      hasTooltips
    });

    this.parent.innerHTML = defaultTemplate;
  }


  _createTemplate({boundaries, values, step, orientation, hasTooltips} = {}) {
    const positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

    return(
      `<div class="slider ${(orientation === "vertical") ? "slider_vertical" : ''}">
        <div class="slider__base">
          ${positions.reduce( (str, position, i) => {
            return str +
            `<div class="slider__handle-group" style="left: ${position}">
              ${hasTooltips ? `<div class="slider__tooltip">${values[i]}</div>` : ''}
              <div class="slider__handle"></div>
            </div>`;
          }, '')}
        </div>
      </div>`
    );
  }


  _updateHandleGroups(positions) {
    const handleGroups = this._getHandleGroups();

    setElementsPosition(handleGroups, positions);
  }


  _updateTooltips(values) {
    const tooltips = this._getTooltips();

    setElementsTextContent(tooltips, values);
  }


  _getHandleGroups() {
    return Array.from(
      this.parent.querySelectorAll(".slider__handle-group")
    );
  }


  _getTooltips() {
    return Array.from(
      this.parent.querySelectorAll(".slider__tooltip")
    );
  }

}
