import "bootstrap";
import Slider from "../modules/slider/prod/Slider.min.js";

const $parent = document.querySelector(".js-slider-wrapper");

Slider.create($parent, {
  boundaries: [0, 100],
  values: [20, 80],
  hasTooltips: true,
});

const $currentValuesTextInput = document.querySelector("#currentValues");
const currentValues = Slider.getOptions($parent).values;

$currentValuesTextInput.value = currentValues.join(", ");

Slider.addSubscriber($parent, "update", function(options) {
  $currentValuesTextInput.value = options.values.join(", ");
});

const $sliderPaneForm = document.querySelector(".js-slider-pane__form");

$sliderPaneForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = $currentValuesTextInput.value.split(", ");

  Slider.setOptions($parent, {
    values,
  });
});

const $form = document.querySelector(".js-control-pane__form");

$form.addEventListener("submit", event => {
  event.preventDefault();

  const $boundariesTextInput = document.querySelector("#boundaries");
  const $valuesTextInput = document.querySelector("#values");
  const $stepNumberInput = document.querySelector("#step");
  const $orientationCheckbox = document.querySelector("#orientation");
  const $hasTooltipsCheckbox = document.querySelector("#hasTooltips");

  const boundaries = $boundariesTextInput.value.split(", ");
  const values = $valuesTextInput.value.split(", ");
  const step = $stepNumberInput.valueAsNumber;
  const orientation = $orientationCheckbox.checked ? "vertical" : "horizontal";
  const hasTooltips = $hasTooltipsCheckbox.checked;

  const options = {
    boundaries,
    values,
    step,
    hasTooltips,
    orientation,
  };

  Slider.create($parent, options);
});
