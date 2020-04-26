import Slider from '../src/Slider';

const sliderWrappers = document.querySelectorAll('.js-slider-wrapper');

const options = [
  {
    boundaries: [1000, 5000],
    values: [1000, 3000, 5000],
    step: 1000,
    hasTooltips: true,
    hasScale: true,
    theme: 'modern',
  },
  {
    boundaries: [0, 333],
    step: 9,
    hasTooltips: true,
  },
  {
    values: [20, 80],
    isVertical: true,
    hasTooltips: true,
    hasScale: true,
    theme: 'modern',
  },
  {
    values: [20, 80],
    isVertical: true,
    hasTooltips: true,
    hasScale: true,
  },
];

options.forEach((option, index) => {
  const sliderWrapper = sliderWrappers[index];

  Slider.create(sliderWrapper, option);
});
