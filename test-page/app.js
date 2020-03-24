import Slider from '../src/Slider';

const parents = document.querySelectorAll('.js-slider-wrapper');
const parent0 = parents[0];
const parent1 = parents[1];
const parent2 = parents[2];
const parent3 = parents[3];

Slider.create(parent0, {
  boundaries: [1000, 5000],
  values: [1000, 3000, 5000],
  step: 1000,
  hasTooltips: true,
  hasScale: true,
  theme: 'modern',
});

Slider.create(parent1, {
  boundaries: [0, 333],
  step: 9,
  hasTooltips: true,
});

Slider.create(parent2, {
  values: [20, 80],
  orientation: 'vertical',
  hasTooltips: true,
  hasScale: true,
  theme: 'modern',
});

Slider.create(parent3, {
  values: [20, 80],
  orientation: 'vertical',
  hasTooltips: true,
  hasScale: true,
});
