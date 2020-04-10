import { findNextFactor, isDivisible } from '../../utilities';

class ViewController {
  constructor(anchorElement, model) {
    this._anchorElement = anchorElement;
    this._model = model;

    this._bindMethods();

    this._paint(this._model.getOptions());
    this._attachElements();
    this._addEventListeners();
  }

  _bindMethods() {
    this._handleScaleClick = this._handleScaleClick.bind(this);
  }

  _paint(options) {
    const values = this._calcScaleValues(options);
    const { orientation } = options;
    const scaleClassName = `scale js-scale ${
      orientation === 'vertical' ? 'scale_vertical' : ''
    }`;

    this._anchorElement.innerHTML = `<div class="${scaleClassName}">
        ${values.reduce((str, value) => {
          return `${str}<div class="scale__segment">
            <span class="scale__pip"></span>
            <span class="scale__value js-scale__value">${value}</span>
          </div>`;
        }, '')}
      </div>`;
  }

  _calcScaleValues({ boundaries, step, orientation, minimalSparsity = 24 }) {
    const [min, max] = boundaries;
    const range = max - min;
    const scaleWidth =
      orientation === 'vertical'
        ? this._getScaleHeight()
        : this._getScaleWidth();

    let scaleStep = step;
    let scaleValuesQuantity = range / step + 1;
    let currentSparsity = scaleWidth / scaleValuesQuantity - 1;

    while (
      !(
        (currentSparsity >= minimalSparsity && isDivisible(scaleStep, step)) ||
        scaleStep >= range
      )
    ) {
      scaleStep = findNextFactor(range, scaleStep + 1);

      scaleValuesQuantity = range / scaleStep + 1;
      currentSparsity = scaleWidth / scaleValuesQuantity - 1;
    }

    const scaleValues = new Array(scaleValuesQuantity)
      .fill(min)
      .map((value, index) => index * scaleStep + value);

    return scaleValues;
  }

  _getScaleWidth() {
    return this._anchorElement.getBoundingClientRect().width;
  }

  _getScaleHeight() {
    return this._anchorElement.getBoundingClientRect().height;
  }

  _attachElements() {
    this._scale =
      this._anchorElement.querySelector('.js-scale') || this._anchorElement;
  }

  _addEventListeners() {
    this._scale.addEventListener('click', this._handleScaleClick);
  }

  _handleScaleClick(event) {
    const scaleValue = event.target.closest('.js-scale__value');

    if (scaleValue !== null) {
      const value = event.target.textContent;

      this._model.setOptions({ values: value });
    }
  }
}

export default ViewController;
