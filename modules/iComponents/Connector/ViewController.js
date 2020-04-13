class ViewController {
  constructor(anchorElement, options) {
    this._anchorElement = anchorElement;

    this._paint(options);
    this._attachElements();
    this.setElements(options);
  }

  setElements({ positions = ['10%', '90%'], orientation }) {
    const [start, end] =
      positions.length === 1
        ? ['0%', positions[0]]
        : [positions[0], positions[positions.length - 1]];

    const connectorStyle = this._connector.style;
    const [startSide, endSide] =
      orientation === 'vertical' ? ['top', 'bottom'] : ['left', 'right'];

    [connectorStyle[startSide], connectorStyle[endSide]] = [
      start,
      `${100 - parseFloat(end)}%`,
    ];
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
