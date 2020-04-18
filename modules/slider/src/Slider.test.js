import { assert } from 'chai';

import Slider from './Slider';
import { DEFAULT_OPTIONS } from './constants';

describe('Slider', () => {
  describe('Slider class methods', () => {
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

        const expectation = {
          ...DEFAULT_OPTIONS,
          ...options,
        };

        assert.deepEqual(Slider.getOptions(parent), expectation);
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
          ...DEFAULT_OPTIONS,
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
          ...DEFAULT_OPTIONS,
          ...options,
          values: [200, 500],
        };

        assert.deepEqual(Slider.getOptions(parent), expectation);
      });
    });
  });

  describe('Slider instance methods', () => {
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

        const slider = Slider.create(parent, options);

        const expectation = {
          ...DEFAULT_OPTIONS,
          ...options,
        };

        assert.deepEqual(slider.getOptions(), expectation);
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

        const slider = Slider.create(parent, options);

        const newOptions = {
          boundaries: [-200, 1000],
          step: 10,
        };

        slider.setOptions(newOptions);

        const expectation = {
          ...DEFAULT_OPTIONS,
          ...options,
          ...newOptions,
        };

        assert.deepEqual(slider.getOptions(), expectation);
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

        const slider = Slider.create(parent, options);

        slider.setValueAt(1, 500);

        const expectation = {
          ...DEFAULT_OPTIONS,
          ...options,
          values: [200, 500],
        };

        assert.deepEqual(slider.getOptions(), expectation);
      });
    });
  });
});
