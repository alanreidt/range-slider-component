import { slider } from "../src/slider";

const sliderWrappers = document.querySelectorAll(".js-slider-wrapper");
const $sliderWrapper0 = sliderWrappers[0];
const $sliderWrapper1 = sliderWrappers[1];
const $sliderWrapper2 = sliderWrappers[2];

slider.create($sliderWrapper0, {
  boundaries: [-30000, 30000],
  values: [-20000, 10000, 20000],
  step: 1000,
  hasTooltips: true,
});

slider.create($sliderWrapper1, {
  values: [20, 80],
  step: 1,
  // orientation: "vertical",
  hasTooltips: true,
});

// slider.setOptions($sliderWrapper1, {
//   boundaries: [-500, 300],
// });

slider.create($sliderWrapper2, {
  orientation: "vertical",
  hasTooltips: true,
});
