import {
  setElementsPosition,
  setElementsTextContent,
  findRatio,
} from "./utilities";
import { findValuePositionBetween, findValueByRatioBetween } from "./helpers";

export class SliderUI {
  constructor($parent, Model) {
    this.$parent = $parent;
    this.Model = Model;

    this._paint(Model.getOptions());
  }

  update({ boundaries, values, orientation } = {}) {
    const positions = values.map((value) =>
      findValuePositionBetween(value, ...boundaries),
    );

    this._updateHandleGroups(positions, orientation);
    this._updateTooltips(values);
  }

  _paint(options) {
    this.$parent.innerHTML = this._createTemplate(options);

    this.$slider = this.$parent.querySelector(".slider");
    this.$base = this.$parent.querySelector(".slider__base");
    this.$handleGroups = this._getHandleGroups();
    this.$tooltips = this._getTooltips();

    this.update(options);
    this._addEventListeners();
  }

  _createTemplate({ values, orientation, hasTooltips } = {}) {
    return `<div class="slider ${
      orientation === "vertical" ? "slider_vertical" : ""
    }">
        <div class="slider__base">
          ${values.reduce((str) => {
            return `${str}<div class="slider__handle-group">
              ${hasTooltips ? `<div class="slider__tooltip"></div>` : ""}
              <div class="slider__handle"></div>
            </div>`;
          }, "")}
        </div>
      </div>`;
  }

  _updateHandleGroups(positions, orientation) {
    if (orientation === "vertical") {
      setElementsPosition(this.$handleGroups, positions, "top");
      return;
    }

    setElementsPosition(this.$handleGroups, positions);
  }

  _updateTooltips(values) {
    setElementsTextContent(this.$tooltips, values);
  }

  _getHandleGroups() {
    return Array.from(this.$parent.querySelectorAll(".slider__handle-group"));
  }

  _getTooltips() {
    return Array.from(this.$parent.querySelectorAll(".slider__tooltip"));
  }

  _addEventListeners() {
    this.$handleGroups.forEach(($handleGroup) => {
      $handleGroup.onmousedown = this._onMouseDown.bind(this);
    });
    this.$base.onmousedown = this._triggerModel.bind(this);
  }

  _onMouseDown(onMouseDownEvent) {
    this._triggerModelBound = (event) =>
      this._triggerModel.call(this, event, onMouseDownEvent);
    this._onMouseUpBound = this._onMouseUp.bind(this);

    document.addEventListener("mousemove", this._triggerModelBound);
    document.addEventListener("mouseup", this._onMouseUpBound);
  }

  _onMouseUp() {
    document.removeEventListener("mouseup", this._onMouseUpBound);
    document.removeEventListener("mousemove", this._triggerModelBound);
  }

  _triggerModel(event, onMouseDownEvent) {
    event.preventDefault();

    const newValue = this._findValue(event);
    const onMouseDownEventTarget = onMouseDownEvent && onMouseDownEvent.target;
    const onMouseDownEventTargetIndex = this.$handleGroups.findIndex(
      ($handleGroup) => $handleGroup.contains(onMouseDownEventTarget),
    );

    if (onMouseDownEventTargetIndex !== -1) {
      this.Model.setValueAt(onMouseDownEventTargetIndex, newValue);
    } else if (event.target === this.$base) {
      this.Model.setOptions({ values: newValue });
    }
  }

  _findValue(event) {
    const { boundaries, orientation } = this.Model.getOptions();

    const position =
      orientation === "horizontal"
        ? this._findHorizontalPosition(event.clientX)
        : this._findVerticalPosition(event.clientY);

    const sliderSize =
      orientation === "horizontal"
        ? this._getSliderWidth()
        : this._getSliderHeight();

    const ratio = findRatio(position, sliderSize);

    return findValueByRatioBetween(ratio, ...boundaries);
  }

  _findHorizontalPosition(eventXCoordinate) {
    return eventXCoordinate - this.$slider.getBoundingClientRect().left;
  }

  _findVerticalPosition(eventYCoordinate) {
    return eventYCoordinate - this.$slider.getBoundingClientRect().top;
  }

  _getSliderWidth() {
    return this.$slider.getBoundingClientRect().width;
  }

  _getSliderHeight() {
    return this.$slider.getBoundingClientRect().height;
  }
}
