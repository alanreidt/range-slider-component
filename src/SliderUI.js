import isUndefined from "lodash/isUndefined";

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
    this._assignElements();
    this.update(Model.getOptions());
    this._addEventListeners();
  }

  update({ boundaries, values, orientation } = {}) {
    const positions = values.map((value) =>
      findValuePositionBetween(value, ...boundaries),
    );

    if (orientation === "horizontal") {
      this._setHandleGroupHorizontalPositions(positions);
    } else {
      this._setHandleGroupVerticalPositions(positions);
    }

    this._setTooltipTextContents(values);
  }

  _paint(options) {
    this.$parent.innerHTML = this._createTemplate(options);
  }

  _assignElements() {
    this.$slider = this.$parent.querySelector(".slider");
    this.$base = this.$parent.querySelector(".slider__base");
    this.$handleGroups = this._getHandleGroups();
    this.$tooltips = this._getTooltips();
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

  _setHandleGroupHorizontalPositions(positions) {
    setElementsPosition(this.$handleGroups, positions);
  }

  _setHandleGroupVerticalPositions(positions) {
    setElementsPosition(this.$handleGroups, positions, "top");
  }

  _setTooltipTextContents(values) {
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
    const { orientation } = this.Model.getOptions();

    const newValue =
      orientation === "horizontal"
        ? this._convertCoordinateToValue({ xCoordinate: event.clientX })
        : this._convertCoordinateToValue({ yCoordinate: event.clientY });

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

  _convertCoordinateToValue({ xCoordinate, yCoordinate }) {
    const [adjustedCoordinate, sliderSize] = !isUndefined(xCoordinate)
      ? [this._adjustToSliderXCoordinate(xCoordinate), this._getSliderWidth()]
      : [this._adjustToSliderYCoordinate(yCoordinate), this._getSliderHeight()];

    const ratio = findRatio(normalizedCoordinate, sliderSize);
    const { boundaries } = this.Model.getOptions();

    return findValueByRatioBetween(ratio, ...boundaries);
  }

  _adjustToSliderXCoordinate(xCoordinate) {
    return xCoordinate - this.$slider.getBoundingClientRect().left;
  }

  _getSliderWidth() {
    return this.$slider.getBoundingClientRect().width;
  }

  _adjustToSliderYCoordinate(yCoordinate) {
    return yCoordinate - this.$slider.getBoundingClientRect().top;
  }

  _getSliderHeight() {
    return this.$slider.getBoundingClientRect().height;
  }
}
