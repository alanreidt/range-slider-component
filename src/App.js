import 'bootstrap';

import PlayGround from './components/playground/PlayGround';

class App {
  constructor(anchorElement, options) {
    this.anchorElement = anchorElement;

    this._attachElements();
    this._createComponents(options);
  }

  _attachElements() {
    this.playground = this.anchorElement.querySelector('.js-playground');
  }

  _createComponents(options) {
    new PlayGround(this.playground, options);
  }
}

const appElement = document.querySelector('.js-app');

window.addEventListener("load", new App(appElement, {
  boundaries: [-200, 300],
  values: [-100, 200],
  step: 20,
  orientation: 'horizontal',
  hasTooltips: true,
}));
