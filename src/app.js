const $parent = document.querySelector(".user-slider");
const $parentVertical = document.querySelector(".user-slider-vertical");

createSlider($parent, {
  values: [0, 100],
  hasTooltips: true,
});

createSlider($parentVertical, {
  boundaries: [200, 1000],
  values: [300, 800],
  step: 100,
  orientation: "vertical",
  hasTooltips: true,
});
