import {getPositionInPercentageOf, setElementsPosition, setElementsTextContent} from "./utilities";

export class SliderUI {

  constructor(parent, model) {
    this.parent = parent;
    this.model = model;

    this._paint( model.getValues() );
  }


  update({boundaries, values, step, orientation, hasTooltips} = {}) {

    if (values && boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      this._updateHandleGroups(positions)
      this._updateTooltips(values)
    }

  }


  _paint({boundaries, values, step, orientation, hasTooltips} = {}) {
    this.parent.innerHTML = this._createTemplate({
      boundaries,
      values,
      step,
      orientation,
      hasTooltips,
    });

    this.update({boundaries, values});
  }


  _createTemplate({boundaries, values, step, orientation, hasTooltips} = {}) {

    return(
      `<div class="slider ${(orientation === "vertical") ? "slider_vertical" : ''}">
        <div class="slider__base">
          ${values.reduce( (str) => {
            return str +
            `<div class="slider__handle-group">
              ${hasTooltips ? `<div class="slider__tooltip"></div>` : ''}
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
