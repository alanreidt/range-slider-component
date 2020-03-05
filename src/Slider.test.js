import { assert } from 'chai';

import Slider from './Slider';

describe('Slider', () => {
  describe('create method', () => {
    it('shall create model with options', () => {
      const options = {
        boundaries: [100, 500],
        values: [200, 300],
        step: 20,
        orientation: 'horizontal',
        hasTooltips: true,
      };
      const parent = document.createElement('div');

      Slider.create(parent, options);

      assert.deepEqual(Slider.getOptions(parent), options);
    });
  });

  describe('setOptions method', () => {
    it('shall set options', () => {
      const options = {
        boundaries: [100, 500],
        values: [200, 300],
        step: 20,
        orientation: 'horizontal',
        hasTooltips: true,
      };
      const parent = document.createElement('div');

      Slider.create(parent, options);

      const newOptions = {
        boundaries: [-200, 1000],
        step: 10,
      };

      Slider.setOptions(parent, newOptions);

      const expectation = {
        ...options,
        ...newOptions,
      };

      assert.deepEqual(Slider.getOptions(parent), expectation);
    });
  });

  describe('setValueAt method', () => {
    it('shall set value at index', () => {
      const options = {
        boundaries: [100, 500],
        values: [200, 300],
        step: 20,
        orientation: 'horizontal',
        hasTooltips: true,
      };
      const parent = document.createElement('div');

      Slider.create(parent, options);

      Slider.setValueAt(parent, 1, 500);

      const expectation = {
        ...options,
        values: [200, 500],
      };

      assert.deepEqual(Slider.getOptions(parent), expectation);
    });
  });
});
