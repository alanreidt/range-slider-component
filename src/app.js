import "bootstrap";

import Slider from "../modules/slider/prod/Slider.min.js";
import ControlPane from "./components/control-pane/ControlPane";

const parent = document.querySelector(".js-slider-wrapper");

Slider.create(parent, {
  boundaries: [0, 100],
  values: [20, 80],
  hasTooltips: true,
});

const controlPaneAnchorElement = document.querySelector(".js-control-pane");

ControlPane.create(controlPaneAnchorElement, {});

ControlPane.addSubscriber(controlPaneAnchorElement, "update", (options) => {
  Slider.create(parent, options);
});

const currentValuesTextInput = document.querySelector(".js-current-values-text-input");
const currentValues = Slider.getOptions(parent).values;

currentValuesTextInput.value = currentValues.join(", ");

Slider.addSubscriber(parent, "update", function(options) {
  currentValuesTextInput.value = options.values.join(", ");
});

const sliderPaneForm = document.querySelector(".js-slider-pane__form");

sliderPaneForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = currentValuesTextInput.value.split(", ");

  Slider.setOptions(parent, {
    values,
  });
});
