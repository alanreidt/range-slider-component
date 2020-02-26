import 'bootstrap';

import Slider from '../modules/slider/prod/Slider.min.js';
import ControlPane from './components/control-pane/ControlPane';
import ControlInput from './components/control-input/ControlInput';

const parent = document.querySelector('.js-slider-wrapper');

Slider.create(parent, {
  boundaries: [0, 100],
  step: 1,
  values: [20, 80],
  hasTooltips: true,
  orientation: 'horizontal',
});

const controlPaneAnchorElement = document.querySelector('.js-control-pane');

ControlPane.create(controlPaneAnchorElement, {});

ControlPane.addSubscriber(controlPaneAnchorElement, 'update', (options) => {
  Slider.create(parent, options);
});

const controlInputAnchorElement = document.querySelector('.js-control-input');

ControlInput.create(controlInputAnchorElement, Slider.getOptions(parent));

ControlInput.addSubscriber(controlInputAnchorElement, 'update', (options) => {
  Slider.setOptions(parent, options);
});

Slider.addSubscriber(parent, 'update', (options) => {
  ControlInput.setOptions(controlInputAnchorElement, options);
});
