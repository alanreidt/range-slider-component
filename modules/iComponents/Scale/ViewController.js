/* eslint-disable class-methods-use-this */
import { findNextFactor, isDivisible } from '../../utilities';

class ViewController {
  constructor(anchorElement, model) {
    this._anchorElement = anchorElement;
    this._model = model;

    this._paint(this._model.getOptions());
  }

  _paint(options) {
    const values = this._calcScaleValues(options);

    this._anchorElement.innerHTML = `<div class="scale js-scale">
        ${values.reduce((str, value) => {
          return `${str}<div class="scale__segment">
            <span class="scale__pip"></span>
            <span class="scale__value">${value}</span>
          </div>`;
        }, '')}
      </div>`;
  }

  _calcScaleValues({ boundaries, step }) {
    const [min, max] = boundaries;
    const range = max - min;
    const minimalDensity = 24;

    let scaleStep = step;
    let scaleValuesQuantity = range / step + 1;
    let currentDensity = 276 / scaleValuesQuantity - 1;

    while (
      currentDensity < minimalDensity ||
      (!isDivisible(scaleStep, step) && scaleStep < range)
    ) {
      scaleStep = findNextFactor(range, scaleStep + 1);

      scaleValuesQuantity = range / scaleStep + 1;
      currentDensity = 276 / scaleValuesQuantity - 1;
    }

    const scaleValues = new Array(scaleValuesQuantity)
      .fill(min)
      .map((value, index) => index * scaleStep + value);

    return scaleValues;
  }
}

export default ViewController;
