const form = document.querySelector(".js-control-pane__form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const boundariesTextInput = document.querySelector(".js-boundaries-text-input");
  const valuesTextInput = document.querySelector(".js-values-text-input");
  const stepNumberInput = document.querySelector(".js-step-number-input");
  const orientationCheckbox = document.querySelector(".js-orientation-checkbox");
  const hasTooltipsCheckbox = document.querySelector(".js-hasTooltips-checkbox");

  const boundaries = boundariesTextInput.value.split(", ");
  const values = valuesTextInput.value.split(", ");
  const step = stepNumberInput.valueAsNumber;
  const orientation = orientationCheckbox.checked ? "vertical" : "horizontal";
  const hasTooltips = hasTooltipsCheckbox.checked;

  const options = {
    boundaries,
    values,
    step,
    hasTooltips,
    orientation,
  };

  Slider.create(parent, options);
});
