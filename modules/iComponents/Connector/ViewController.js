class ViewController {
  constructor(anchorElement, model) {
    this._anchorElement = anchorElement;
    this._model = model;

    this._paint(this._model.getOptions());
    this._attachElements();
    this.setElements(this._model.getOptions());
  }

  setElements({ positions = ['0%', '100%'] }) {
    let [start, end = '0%'] = positions;

    if (start > end) {
      [start, end] = [end, start];
    }

    const { orientation } = this._model.getOptions();
    const direction = orientation === 'vertical' ? 'to top' : 'to right';
    const connectorStyle = getComputedStyle(this._connector);
    const currentBackgroundColor = connectorStyle.backgroundColor;

    this._connector.style.background = `linear-gradient(${direction}, transparent ${start}, ${currentBackgroundColor} ${start} ${end}, transparent ${end})`;
  }

  _paint({ orientation }) {
    const connectorClassName = `connector js-connector ${
      orientation === 'vertical' ? 'connector_vertical' : ''
    }`;

    this._anchorElement.innerHTML = `<div class="${connectorClassName}"></div>`;
  }

  _attachElements() {
    this._connector =
      this._anchorElement.querySelector('.js-connector') || this._anchorElement;
  }
}

export default ViewController;
