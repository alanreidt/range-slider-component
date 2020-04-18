class ViewController {
  constructor(anchorElement, model) {
    this.anchorElement = anchorElement;
    this.model = model;

    this._bindMethods();
    this._attachElements();
    this.form.addEventListener('submit', this._handleFormSubmit);
    this.setElements(model.getOptions());
  }

  setElements({
    boundaries,
    values,
    step,
    hasTooltips,
    hasScale,
    hasConnector,
    orientation,
    theme,
  } = {}) {
    [this.minimumNumberInput.value, this.maximumNumberInput.value] = boundaries;
    this.valuesTextInput.value = values.join(', ');
    this.stepNumberInput.value = step;
    this.hasTooltipsCheckbox.checked = hasTooltips;
    this.hasScaleCheckbox.checked = hasScale;
    this.hasConnectorCheckbox.checked = hasConnector;
    this.orientationCheckbox.checked = orientation === 'vertical';
    this.modernThemeCheckbox.checked = theme === 'modern';
  }

  _bindMethods() {
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _attachElements() {
    this.form = this.anchorElement.querySelector('.js-control-pane__form');
    this.minimumNumberInput = this.anchorElement.querySelector(
      '.js-control-pane__minimum-input',
    );
    this.maximumNumberInput = this.anchorElement.querySelector(
      '.js-control-pane__maximum-input',
    );
    this.valuesTextInput = this.anchorElement.querySelector(
      '.js-control-pane__values-input',
    );
    this.stepNumberInput = this.anchorElement.querySelector(
      '.js-control-pane__step-input',
    );
    this.hasTooltipsCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__hasTooltips-checkbox',
    );
    this.hasScaleCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__hasScale-checkbox',
    );
    this.hasConnectorCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__hasConnector-checkbox',
    );
    this.orientationCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__orientation-checkbox',
    );
    this.modernThemeCheckbox = this.anchorElement.querySelector(
      '.js-control-pane__modern-theme-checkbox',
    );
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    const boundaries = [
      this.minimumNumberInput.valueAsNumber,
      this.maximumNumberInput.valueAsNumber,
    ];
    const values = this.valuesTextInput.value.split(', ');
    const step = this.stepNumberInput.valueAsNumber;
    const hasTooltips = this.hasTooltipsCheckbox.checked;
    const hasScale = this.hasScaleCheckbox.checked;
    const hasConnector = this.hasConnectorCheckbox.checked;
    const orientation = this.orientationCheckbox.checked
      ? 'vertical'
      : 'horizontal';
    const theme = this.modernThemeCheckbox.checked && 'modern';

    this.model.setOptions({
      boundaries,
      values,
      step,
      hasTooltips,
      hasScale,
      hasConnector,
      orientation,
      theme,
    });
  }
}

export default ViewController;
