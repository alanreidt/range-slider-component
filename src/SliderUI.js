import {getPositionInPercentageOf, translateProportionIntoValue, setElementsPosition, setElementsTextContent} from "./utilities";

export class SliderUI {

  constructor($parent, model) {
    this.$parent = $parent;
    this.model = model;

    this._paint( model.getOptions() );
  }


  update({boundaries, values, step, orientation, hasTooltips} = {}) {

    if (values && boundaries) {
      let positions = values.map( (value) => getPositionInPercentageOf(value, boundaries) );

      this._updateHandleGroups(positions)
      this._updateTooltips(values)
    }

  }


  _paint({boundaries, values, step, orientation, hasTooltips} = {}) {
    this.$parent.innerHTML = this._createTemplate({
      boundaries,
      values,
      step,
      orientation,
      hasTooltips,
    });

    this.$slider = this.$parent.querySelector(".slider");
    this.$base = this.$parent.querySelector(".slider__base");
    this.$handleGroups = this._getHandleGroups();
    this.$tooltips = this._getTooltips();

    this.update({boundaries, values});
    this._addEventListeners();
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
    setElementsPosition(this.$handleGroups, positions);
  }


  _updateTooltips(values) {
    setElementsTextContent(this.$tooltips, values);
  }


  _getHandleGroups() {
    return Array.from(
      this.$parent.querySelectorAll(".slider__handle-group")
    );
  }


  _getTooltips() {
    return Array.from(
      this.$parent.querySelectorAll(".slider__tooltip")
    );
  }


  _addEventListeners() {
    this.$handleGroups.forEach( ($handleGroup) => {
      $handleGroup.onmousedown = this._onMouseDown.bind(this);
    });
    this.$base.onmousedown = this._triggerModel.bind(this);
  }


  _onMouseDown() {
    document.addEventListener("mousemove", _onMouseMove);
    document.addEventListener("mouseup", _onMouseUp);
  }


  _triggerModel(event) {
    event.preventDefault();
    const sliderWidth = this.$slider.getBoundingClientRect().width;
    const position = event.clientX - this.$slider.getBoundingClientRect().left;
    const proportion = position / sliderWidth * 100;
    const value = this._calcValue(proportion);

    this.model.update({values: value});
  }


  _calcValue(proportion) {
    const {boundaries} = this.model.getOptions();

    return translateProportionIntoValue(proportion, boundaries);
  }

}
