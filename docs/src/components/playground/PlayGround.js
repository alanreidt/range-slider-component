import Slider from '../../../modules/slider/prod/Slider.min';
import ControlPane from '../control-pane/ControlPane';
import ControlInput from '../control-input/ControlInput';

class PlayGround {
  constructor(anchorElement, options) {
    this.anchorElement = anchorElement;

    this._attachElements();
    this._createComponents(options);
    this._tieComponents();
  }

  _attachElements() {
    this.sliderElement = this.anchorElement.querySelector('.js-slider-wrapper');
    this.controlPaneElement = this.anchorElement.querySelector(
      '.js-control-pane',
    );
    this.controlInputElement = this.anchorElement.querySelector(
      '.js-control-input-wrapper',
    );
  }

  _createComponents(options) {
    Slider.create(this.sliderElement, options);

    const sliderOptions = Slider.getOptions(this.sliderElement);

    ControlPane.create(this.controlPaneElement, sliderOptions);
    ControlInput.create(this.controlInputElement, sliderOptions);
  }

  _tieComponents() {
    ControlPane.addSubscriber(this.controlPaneElement, 'update', (options) => {
      new this.constructor(this.anchorElement, options);
    });

    ControlInput.addSubscriber(
      this.controlInputElement,
      'update',
      (options) => {
        Slider.setOptions(this.sliderElement, options);
      },
    );

    Slider.addSubscriber(this.sliderElement, 'update', (options) => {
      ControlInput.setOptions(this.controlInputElement, options);
    });
  }
}

export default PlayGround;
