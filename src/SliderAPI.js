import { sliderFactory } from "./SliderFactory";


export const SliderAPI = {
  _factory: sliderFactory,
  _parentsMap: new WeakMap(),

  createSlider($parent, options) {
    const slider = this._factory.createSlider(options);
    const model = this._factory.createModel(slider);
    const sliderUi = this._factory.createUI($parent, model);

    const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
    model.addSubscriber("update", sliderUiBoundedUpdate);

    this._parentsMap.set($parent, {
      slider,
      model,
      sliderUi,
    });
  },

  getOptions($parent) {
    return this._parentsMap.get($parent).model.getOptions();
  },

  setOptions($parent, options) {
    this._parentsMap.get($parent).model.update(options);
  },

};
