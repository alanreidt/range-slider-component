import { sliderFactory } from "./SliderFactory";


export const SliderAPI = {
  _factory: sliderFactory,
  _parentsMap: new WeakMap(),

  createSlider($parent, options) {
    const slider = this._factory.createSlider(options);
    const sliderAdapter = this._factory.createAdapter(slider);
    const sliderUi = this._factory.createUI($parent, sliderAdapter);

    const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
    sliderAdapter.addSubscriber("update", sliderUiBoundedUpdate);

    this._parentsMap.set($parent, {
      slider,
      sliderAdapter,
      sliderUi,
    });
  },

  getOptions($parent) {
    return this._parentsMap.get($parent).sliderAdapter.getOptions();
  },

  setOptions($parent, options) {
    this._parentsMap.get($parent).sliderAdapter.update(options);
  },

};
