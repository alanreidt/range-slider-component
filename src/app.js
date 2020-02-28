import 'bootstrap';

import Slider from '../modules/slider/prod/Slider.min.js';
import ControlPane from './components/control-pane/ControlPane';
import ControlInput from './components/control-input/ControlInput';

class App {
  constructor(anchorElement, options) {
    this.anchorElement = anchorElement;

    this._attachElements();
    this._createComponents(options);
    this._tieComponents();
  }

  _attachElements() {
    this.sliderElement = this.anchorElement.querySelector('.js-slider-wrapper');
    this.controlPaneElement = this.anchorElement.querySelector('.js-control-pane');
    this.controlInputElement = this.anchorElement.querySelector('.js-control-input');
  }

  _createComponents(options) {
    Slider.create(this.sliderElement, options);
    ControlPane.create(this.controlPaneElement, options);
    ControlInput.create(this.controlInputElement, options);
  }

  _tieComponents() {
    ControlPane.addSubscriber(this.controlPaneElement, 'update', (options) => {
      new this.constructor(this.anchorElement, options);
    });

    ControlInput.addSubscriber(this.controlInputElement, 'update', (options) => {
      Slider.setOptions(this.sliderElement, options);
    });

    Slider.addSubscriber(this.sliderElement, 'update', (options) => {
      ControlInput.setOptions(this.controlInputElement, options);
    });
  }
}

const appElement = document.querySelector('.js-app');

window.addEventListener("load", new App(appElement, {
  boundaries: [0, 100],
  step: 1,
  values: [20, 80],
  hasTooltips: true,
  orientation: 'horizontal',
}));
