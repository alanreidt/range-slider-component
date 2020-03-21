import { findNextFactor, isDivisible } from '../../utilities';

class ViewController {
  constructor() {}

  _someMethod({ boundaries, step }) {
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
  }

  _render(values) {
    return `<div class="scale js-scale">
        ${values.reduce((str, value) => {
          return `${str}<div class="scale__segment">
            <span class="scale__pip"></span>
            <span class="scale__value">${value}</span>
          </div>`;
        }, '')}
      </div>`;
  }
}

export default ViewController;
