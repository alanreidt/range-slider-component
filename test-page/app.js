import Slider from '../src/Slider';

const parents = document.querySelectorAll('.js-slider-wrapper');
const parent0 = parents[0];
const parent1 = parents[1];
const parent2 = parents[2];

Slider.create(parent0, {
  boundaries: [10, 50],
  values: [10, 30, 50],
  step: 1,
  hasTooltips: true,
});

Slider.create(parent1, {
  boundaries: [0, 333],
  step: 9,
  hasTooltips: true,
});

Slider.create(parent2, {
  orientation: 'vertical',
  hasTooltips: true,
});
