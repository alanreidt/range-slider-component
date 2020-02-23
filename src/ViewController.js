import isUndefined from 'lodash/isUndefined';

import { findRatio } from './utilities';
import {
  findValuePositionBetween,
  findValueByRatioBetween,
  createTemplate,
} from './helpers';
import {
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
  JS_SLIDER_SELECTOR,
  JS_BASE_SELECTOR,
  JS_HANDLE_GROUP_SELECTOR,
  JS_TOOLTIP_SELECTOR,
} from './constants';

class ViewController {
  constructor(parent, model) {
    this.parent = parent;
    this.model = model;

    this._bindMethods();

    this._paint(model.getOptions());
    this._attachElements();
    this._addSliderEventListener();
    this.setElements(model.getOptions());
  }

  setElements({ boundaries, values, orientation } = {}) {
    const positions = values.map((value) =>
      findValuePositionBetween(value, ...boundaries),
    );

    if (orientation === ORIENTATION_HORIZONTAL) {
      this._setHandleGroupHorizontalPositions(positions);
    }

    if (orientation === ORIENTATION_VERTICAL) {
      this._setHandleGroupVerticalPositions(positions);
    }

    this._setTooltipTextContents(values);
  }

  _setHandleGroupHorizontalPositions(positions) {
    this.handleGroups.forEach((handleGroup, i) => {
      handleGroup.style.left = positions[i];
    });
  }

  _setHandleGroupVerticalPositions(positions) {
    this.handleGroups.forEach((handleGroup, i) => {
      handleGroup.style.top = positions[i];
    });
  }

  _setTooltipTextContents(values) {
    this.tooltips.forEach((tooltip, i) => {
      tooltip.textContent = values[i];
    });
  }

  _bindMethods() {
    this._handleSliderMouseDown = this._handleSliderMouseDown.bind(this);
    this._handleDocumentMouseMove = this._handleDocumentMouseMove.bind(this);
    this._handleDocumentMouseUp = this._handleDocumentMouseUp.bind(this);
  }

  _paint(options) {
    this.parent.innerHTML = createTemplate(options);
  }

  _attachElements() {
    this.slider = this.parent.querySelector(JS_SLIDER_SELECTOR);
    this.base = this.parent.querySelector(JS_BASE_SELECTOR);
    this.handleGroups = this._getHandleGroups();
    this.tooltips = this._getTooltips();
  }

  _getHandleGroups() {
    return [...this.parent.querySelectorAll(JS_HANDLE_GROUP_SELECTOR)];
  }

  _getTooltips() {
    return [...this.parent.querySelectorAll(JS_TOOLTIP_SELECTOR)];
  }

  _addSliderEventListener() {
    this.slider.onmousedown = this._handleSliderMouseDown;
  }

  _handleSliderMouseDown(event) {
    event.preventDefault();

    const newValue = this._findValueByEvent(event);
    const target = event && event.target;

    if (target === this.base) {
      this.model.setOptions({ values: newValue });
    }

    const currentHandleGroup =
      target && target.closest(JS_HANDLE_GROUP_SELECTOR);

    if (currentHandleGroup) {
      this._handleHandleGroupMouseDown(currentHandleGroup);
    }
  }

  _handleHandleGroupMouseDown(handleGroup) {
    this._handleDocumentMouseMoveLocked = (event) =>
      this._handleDocumentMouseMove.call(this, handleGroup, event);

    document.addEventListener('mousemove', this._handleDocumentMouseMoveLocked);
    document.addEventListener('mouseup', this._handleDocumentMouseUp);
  }

  _handleDocumentMouseMove(handleGroup, event) {
    const index = Number(handleGroup.dataset.index);
    const newValue = this._findValueByEvent(event);

    this.model.setValueAt(index, newValue);
  }

  _handleDocumentMouseUp() {
    document.removeEventListener(
      'mousemove',
      this._handleDocumentMouseMoveLocked,
    );
    document.removeEventListener('mouseup', this._handleDocumentMouseUp);
  }

  _findValueByEvent(event) {
    const { orientation } = this.model.getOptions();

    return orientation === ORIENTATION_HORIZONTAL
      ? this._convertCoordinateToValue({ xCoordinate: event.clientX })
      : this._convertCoordinateToValue({ yCoordinate: event.clientY });
  }

  _convertCoordinateToValue({ xCoordinate, yCoordinate }) {
    const [adjustedCoordinate, sliderSize] = !isUndefined(xCoordinate)
      ? [this._adjustToSliderXAxis(xCoordinate), this._getSliderWidth()]
      : [this._adjustToSliderYAxis(yCoordinate), this._getSliderHeight()];

    const ratio = findRatio(adjustedCoordinate, sliderSize);
    const { boundaries } = this.model.getOptions();

    return findValueByRatioBetween(ratio, ...boundaries);
  }

  _adjustToSliderXAxis(xCoordinate) {
    return xCoordinate - this.slider.getBoundingClientRect().left;
  }

  _adjustToSliderYAxis(yCoordinate) {
    return yCoordinate - this.slider.getBoundingClientRect().top;
  }

  _getSliderWidth() {
    return this.slider.getBoundingClientRect().width;
  }

  _getSliderHeight() {
    return this.slider.getBoundingClientRect().height;
  }
}

export default ViewController;
