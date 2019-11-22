import { sliderFactory } from "./SliderFactory";


export const slider = {
  _factory: sliderFactory,
  _parentsMap: new WeakMap(),

  createSlider($parent, options) {
    const sliderModel = this._factory.createModel(options);
    const sliderAdapter = this._factory.createAdapter(sliderModel);
    const sliderUi = this._factory.createUI($parent, sliderAdapter);

    const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
    sliderAdapter.addSubscriber("update", sliderUiBoundedUpdate);

    this._parentsMap.set($parent, {
      sliderModel,
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
