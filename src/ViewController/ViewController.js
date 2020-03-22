import isUndefined from 'lodash/isUndefined';

import Scale from '../../modules/iComponents/Scale/ViewController';
import { findRatio } from '../../modules/utilities';
import {
  findValuePositionBetween,
  findValueByRatioBetween,
  createTemplate,
} from '../helpers';
import {
  ORIENTATION_HORIZONTAL,
  ORIENTATION_VERTICAL,
  JS_SLIDER_SELECTOR,
  JS_BASE_SELECTOR,
  JS_HANDLE_GROUP_SELECTOR,
  JS_TOOLTIP_SELECTOR,
} from '../constants';

class ViewController {
  constructor(parent, model) {
    this._parent = parent;
    this._model = model;

    this._bindMethods();

    this._paint(this._model.getOptions());
    this._attachElements();
    this._addSliderEventListener();
    this.setElements(this._model.getOptions());
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

    new Scale(this._scale, this._model);
  }

  _setHandleGroupHorizontalPositions(positions) {
    this._handleGroups.forEach((handleGroup, i) => {
      handleGroup.style.left = positions[i];
    });
  }

  _setHandleGroupVerticalPositions(positions) {
    this._handleGroups.forEach((handleGroup, i) => {
      handleGroup.style.top = positions[i];
    });
  }

  _setTooltipTextContents(values) {
    this._tooltips.forEach((tooltip, i) => {
      tooltip.textContent = values[i];
    });
  }

  _bindMethods() {
    this._handleSliderMouseDown = this._handleSliderMouseDown.bind(this);
    this._handleDocumentMouseMove = this._handleDocumentMouseMove.bind(this);
    this._handleDocumentMouseUp = this._handleDocumentMouseUp.bind(this);
  }

  _paint(options) {
    this._parent.innerHTML = createTemplate(options);
  }

  _attachElements() {
    this._slider = this._parent.querySelector(JS_SLIDER_SELECTOR);
    this._base = this._parent.querySelector(JS_BASE_SELECTOR);
    this._handleGroups = this._getHandleGroups();
    this._tooltips = this._getTooltips();
    this._scale = this._parent.querySelector('.js-slider__scale');
  }

  _getHandleGroups() {
    return [...this._parent.querySelectorAll(JS_HANDLE_GROUP_SELECTOR)];
  }

  _getTooltips() {
    return [...this._parent.querySelectorAll(JS_TOOLTIP_SELECTOR)];
  }

  _addSliderEventListener() {
    this._slider.onmousedown = this._handleSliderMouseDown;
  }

  _handleSliderMouseDown(event) {
    event.preventDefault();

    const newValue = this._findValueByEvent(event);
    const target = event && event.target;

    if (target === this._base) {
      this._model.setOptions({ values: newValue });
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

    this._model.setValueAt(index, newValue);
  }

  _handleDocumentMouseUp() {
    document.removeEventListener(
      'mousemove',
      this._handleDocumentMouseMoveLocked,
    );
    document.removeEventListener('mouseup', this._handleDocumentMouseUp);
  }

  _findValueByEvent(event) {
    const { orientation } = this._model.getOptions();

    return orientation === ORIENTATION_HORIZONTAL
      ? this._convertCoordinateToValue({ xCoordinate: event.clientX })
      : this._convertCoordinateToValue({ yCoordinate: event.clientY });
  }

  _convertCoordinateToValue({ xCoordinate, yCoordinate }) {
    const [adjustedCoordinate, sliderSize] = !isUndefined(xCoordinate)
      ? [this._adjustToSliderXAxis(xCoordinate), this._getSliderWidth()]
      : [this._adjustToSliderYAxis(yCoordinate), this._getSliderHeight()];

    const ratio = findRatio(adjustedCoordinate, sliderSize);
    const { boundaries } = this._model.getOptions();

    return findValueByRatioBetween(ratio, ...boundaries);
  }

  _adjustToSliderXAxis(xCoordinate) {
    return xCoordinate - this._slider.getBoundingClientRect().left;
  }

  _adjustToSliderYAxis(yCoordinate) {
    return yCoordinate - this._slider.getBoundingClientRect().top;
  }

  _getSliderWidth() {
    return this._slider.getBoundingClientRect().width;
  }

  _getSliderHeight() {
    return this._slider.getBoundingClientRect().height;
  }
}

export default ViewController;
