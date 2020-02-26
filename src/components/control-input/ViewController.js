class ViewController {
  constructor(anchorElement, model) {
    this.anchorElement = anchorElement;
    this.model = model;

    this._bindMethods();
    this._attachElements();
    this.form.addEventListener('submit', this._handleFormSubmit);
    this.setElements(model.getOptions());
  }

  setElements({ values } = {}) {
    this.currentValuesTextInput.setAttribute('value', values.join(', '));
  }

  _bindMethods() {
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _attachElements() {
    this.form = this.anchorElement.querySelector('.js-slider-pane__form');
    this.currentValuesTextInput = this.anchorElement.querySelector('.js-current-values-text-input');
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    const values = this.currentValuesTextInput.value.split(', ');

    this.model.setOptions({
      values,
    });
  }
}

export default ViewController;
