import isUndefined from 'lodash/isUndefined';

import Scale from '../../modules/iComponents/Scale/Scale';
import Connector from '../../modules/iComponents/Connector/Connector';
import { findRatio } from '../../modules/utilities';
import {
  findValuePositionBetween,
  findValueByRatioBetween,
  createTemplate,
} from '../helpers';
import {
  JS_SLIDER_SELECTOR,
  JS_BASE_SELECTOR,
  JS_HANDLE_GROUP_SELECTOR,
  JS_TOOLTIP_SELECTOR,
  JS_SCALE_SELECTOR,
  JS_CONNECTOR_SELECTOR,
} from '../constants';

class ViewController {
  constructor(parent, model) {
    this._parent = parent;
    this._model = model;

    this._bindMethods();

    this._paint(this._model.getOptions());
    this._attachElements();
    this._createComponents(this._model.getOptions());
    this._addSliderEventListener();
    this._setElements();
  }

  update() {
    requestAnimationFrame(this._setElements);
  }

  _setElements() {
    const {
      boundaries,
      values,
      hasConnector,
      isVertical,
    } = this._model.getOptions();

    const positions = values.map((value) =>
      findValuePositionBetween(value, ...boundaries),
    );

    this._setHandleGroupZIndexes({ boundaries, values });

    if (isVertical) {
      this._setHandleGroupVerticalPositions(positions);
    } else {
      this._setHandleGroupHorizontalPositions(positions);
    }

    this._setTooltipTextContents(values);

    if (hasConnector) {
      Connector.setElements(this._connector, {
        positions,
        isVertical,
      });
    }
  }

  _setHandleGroupZIndexes({ boundaries, values }) {
    const [start, end] = boundaries;
    const middle = (end - start) / 2;
    let zIndex = 201;

    this._handleGroups.reduceRight((prevHandleGroup, handleGroup, index) => {
      handleGroup.style.zIndex = '';

      if (values[index] > middle) {
        handleGroup.style.zIndex = zIndex;
        zIndex += 1;
      }
    });
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
    this.update = this.update.bind(this);
    this._setElements = this._setElements.bind(this);
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
    this._scale = this._parent.querySelector(JS_SCALE_SELECTOR);
    this._connector = this._parent.querySelector(JS_CONNECTOR_SELECTOR);
  }

  _getHandleGroups() {
    return [...this._parent.querySelectorAll(JS_HANDLE_GROUP_SELECTOR)];
  }

  _getTooltips() {
    return [...this._parent.querySelectorAll(JS_TOOLTIP_SELECTOR)];
  }

  _createComponents({
    boundaries,
    values,
    hasScale,
    hasConnector,
    isVertical,
  }) {
    const positions = values.map((value) =>
      findValuePositionBetween(value, ...boundaries),
    );

    if (hasScale) {
      Scale.create(this._scale, this._model);
    }

    if (hasConnector) {
      Connector.create(this._connector, {
        positions,
        isVertical,
      });
    }
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
    const { isVertical } = this._model.getOptions();

    return isVertical
      ? this._convertCoordinateToValue({ yCoordinate: event.clientY })
      : this._convertCoordinateToValue({ xCoordinate: event.clientX });
  }

  _convertCoordinateToValue({ xCoordinate, yCoordinate }) {
    const [adjustedCoordinate, baseSize] = !isUndefined(xCoordinate)
      ? [this._adjustToBaseXAxis(xCoordinate), this._getBaseWidth()]
      : [this._adjustToBaseYAxis(yCoordinate), this._getBaseHeight()];

    const ratio = findRatio(adjustedCoordinate, baseSize);
    const { boundaries } = this._model.getOptions();

    return findValueByRatioBetween(ratio, ...boundaries);
  }

  _adjustToBaseXAxis(xCoordinate) {
    return xCoordinate - this._base.getBoundingClientRect().left;
  }

  _adjustToBaseYAxis(yCoordinate) {
    return yCoordinate - this._base.getBoundingClientRect().top;
  }

  _getBaseWidth() {
    return this._base.getBoundingClientRect().width;
  }

  _getBaseHeight() {
    return this._base.getBoundingClientRect().height;
  }
}

export default ViewController;
