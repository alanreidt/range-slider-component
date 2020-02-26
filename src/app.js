import 'bootstrap';

import Slider from '../modules/slider/prod/Slider.min.js';
import ControlPane from './components/control-pane/ControlPane';
import ControlInput from './components/control-input/ControlInput';

class App {
  constructor(anchorElement) {
    this.anchorElement = anchorElement;

    this._attachElements();
    this._createComponents();
    this._tieComponents();
  }

  _attachElements() {
    this.sliderElement = this.anchorElement.querySelector('.js-slider-wrapper');
    this.controlPaneElement = this.anchorElement.querySelector('.js-control-pane');
    this.controlInputElement = this.anchorElement.querySelector('.js-control-input');
  }

  _createComponents() {
    Slider.create(this.sliderElement, {
      boundaries: [0, 100],
      step: 1,
      values: [20, 80],
      hasTooltips: true,
      orientation: 'horizontal',
    });

    ControlPane.create(this.controlPaneElement, {});

    ControlInput.create(this.controlInputElement, Slider.getOptions(this.sliderElement));
  }

  _tieComponents() {
    ControlPane.addSubscriber(this.controlPaneElement, 'update', (options) => {
      Slider.create(this.sliderElement, options);
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

window.addEventListener("load", new App(appElement));
