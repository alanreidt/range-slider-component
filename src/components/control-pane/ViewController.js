class ViewController {
  constructor(anchorElement, model) {
    this.anchorElement = anchorElement;
    this.model = model;

    this._bindMethods();
    this._attachElements();
    this.form.addEventListener('submit', this._handleFormSubmit);
    this.setElements(model.getOptions());
  }

  setElements({ boundaries, values, step, orientation, hasTooltips } = {}) {
    this.boundariesTextInput.value = boundaries.join(', ');
    this.valuesTextInput.value = values.join(', ');
    this.stepNumberInput.value = step;
    this.orientationCheckbox.checked = orientation === 'vertical';
    this.hasTooltipsCheckbox.checked = hasTooltips;
  }

  _bindMethods() {
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _attachElements() {
    this.form = this.anchorElement.querySelector('.js-control-pane__form');
    this.boundariesTextInput = this.anchorElement.querySelector(
      '.js-control-pane__boundaries-input',
    );
    this.valuesTextInput = this.anchorElement.querySelector(
      '.js-control-pane__values-input',
    );
    this.stepNumberInput = this.anchorElement.querySelector(
      '.js-control-pane__step-input',
    );
    this.orientationCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__orientation-checkbox',
    );
    this.hasTooltipsCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__hasTooltips-checkbox',
    );
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    const boundaries = this.boundariesTextInput.value.split(', ');
    const values = this.valuesTextInput.value.split(', ');
    const step = this.stepNumberInput.valueAsNumber;
    const orientation = this.orientationCheckbox.checked
      ? 'vertical'
      : 'horizontal';
    const hasTooltips = this.hasTooltipsCheckbox.checked;

    this.model.setOptions({
      boundaries,
      values,
      step,
      hasTooltips,
      orientation,
    });
  }
}

export default ViewController;
