import {getPositionInPercentageOf, setElementsPosition, setElementsTextContent} from "./utilities";

export class SliderUI {

  constructor(parent, template) {
    this.parent = parent;
    this.template = template;
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


  _updateHandleGroups(positions) {
    const handleGroups = this._getHandleGroups();

    setElementsPosition(handleGroups, positions);
  }


  _getHandleGroups() {
    return Array.from(
      this.parent.querySelectorAll(".slider__handle-group")
    );
  }


  _updateTooltips(values) {
    const tooltips = this._getTooltips();

    setElementsTextContent(tooltips, values);
  }


  _getTooltips() {
    return Array.from(
      this.parent.querySelectorAll(".slider__tooltip")
    );
  }

}
