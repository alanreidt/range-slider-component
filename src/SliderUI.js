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
    this._triggerModelBound = this._triggerModel.bind(this);
    this._onMouseUpBound = this._onMouseUp.bind(this);

    this.$handleGroups.forEach( ($handleGroup) => {
      $handleGroup.onmousedown = this._onMouseDown.bind(this);
    });
    this.$base.onmousedown = this._triggerModelBound;
  }


  _onMouseDown() {
    document.addEventListener("mousemove", this._triggerModelBound);
    document.addEventListener("mouseup", this._onMouseUpBound);
  }


  _onMouseUp() {
    document.removeEventListener("mouseup", this._onMouseUpBound);
    document.removeEventListener("mousemove", this._triggerModelBound);
  }


  _triggerModel(event) {
    const currentValues = this.model.getOptions().values.slice();
    const sliderWidth = this.$slider.getBoundingClientRect().width;
    const position = event.clientX - this.$slider.getBoundingClientRect().left;
    const proportion = position / sliderWidth * 100;
    let newValue = this._calcValue(proportion);

    event.preventDefault();

    if ( this.$handleGroups.includes(event.target) ) {
      const targetIndex = this.$handleGroups.indexOf(event.target);

      currentValues.splice(targetIndex, 1, newValue);
      newValue = currentValues;
      console.error(`handle-groups: ${newValue}`);
    }

    console.log(`base: ${newValue}`);
    this.model.update({values: newValue});
  }


  _calcValue(proportion) {
    const {boundaries} = this.model.getOptions();

    return translateProportionIntoValue(proportion, boundaries);
  }

}
