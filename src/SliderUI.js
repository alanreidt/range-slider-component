import isUndefined from "lodash/isUndefined";

import { findRatio } from "./utilities";
import {
  findValuePositionBetween,
  findValueByRatioBetween,
  createTemplate,
} from "./helpers";

export class SliderUI {
  constructor($parent, model) {
    this.$parent = $parent;
    this.model = model;

    this._paint(model.getOptions());
    this._assignElements();
    this._addEventListeners();
    this.setElements(model.getOptions());
  }

  setElements({ boundaries, values, orientation } = {}) {
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

  _setHandleGroupHorizontalPositions(positions) {
    this.$handleGroups.forEach(($handleGroup, i) => {
      $handleGroup.style.left = positions[i];
    });
  }

  _setHandleGroupVerticalPositions(positions) {
    this.$handleGroups.forEach(($handleGroup, i) => {
      $handleGroup.style.top = positions[i];
    });
  }

  _setTooltipTextContents(values) {
    this.$tooltips.forEach(($tooltip, i) => {
      $tooltip.textContent = values[i];
    });
  }

  _paint(options) {
    this.$parent.innerHTML = createTemplate(options);
  }

  _assignElements() {
    this.$slider = this.$parent.querySelector(".slider");
    this.$base = this.$parent.querySelector(".slider__base");
    this.$handleGroups = this._getHandleGroups();
    this.$tooltips = this._getTooltips();
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
    const { orientation } = this.model.getOptions();

    const newValue =
      orientation === "horizontal"
        ? this._convertCoordinateToValue({ xCoordinate: event.clientX })
        : this._convertCoordinateToValue({ yCoordinate: event.clientY });

    const onMouseDownEventTarget = onMouseDownEvent && onMouseDownEvent.target;
    const onMouseDownEventTargetIndex = this.$handleGroups.findIndex(
      ($handleGroup) => $handleGroup.contains(onMouseDownEventTarget),
    );

    if (onMouseDownEventTargetIndex !== -1) {
      this.model.setValueAt(onMouseDownEventTargetIndex, newValue);
    } else if (event.target === this.$base) {
      this.model.setOptions({ values: newValue });
    }
  }

  _convertCoordinateToValue({ xCoordinate, yCoordinate }) {
    const [adjustedCoordinate, sliderSize] = !isUndefined(xCoordinate)
      ? [this._adjustToSliderXCoordinate(xCoordinate), this._getSliderWidth()]
      : [this._adjustToSliderYCoordinate(yCoordinate), this._getSliderHeight()];

    const ratio = findRatio(adjustedCoordinate, sliderSize);
    const { boundaries } = this.model.getOptions();

    return findValueByRatioBetween(ratio, ...boundaries);
  }

  _adjustToSliderXCoordinate(xCoordinate) {
    return xCoordinate - this.$slider.getBoundingClientRect().left;
  }

  _adjustToSliderYCoordinate(yCoordinate) {
    return yCoordinate - this.$slider.getBoundingClientRect().top;
  }

  _getSliderWidth() {
    return this.$slider.getBoundingClientRect().width;
  }

  _getSliderHeight() {
    return this.$slider.getBoundingClientRect().height;
  }
}
