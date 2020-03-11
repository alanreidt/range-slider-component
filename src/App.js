import 'bootstrap';

import { dataSet } from './data';
import PlayGround from './components/playground/PlayGround';

class App {
  constructor(anchorElement, dataSet) {
    this.anchorElement = anchorElement;

    this._attachElements();
    this._createComponents(dataSet);
  }

  _attachElements() {
    this.playgrounds = this.anchorElement.querySelectorAll('.js-playground');
  }

  _createComponents(dataSet) {
    this.playgrounds.forEach((playground, index) => {
      const data = dataSet[index];

      new PlayGround(playground, data.options);
    });
  }
}

const appElement = document.querySelector('.js-app');

window.addEventListener('load', new App(appElement, dataSet));
