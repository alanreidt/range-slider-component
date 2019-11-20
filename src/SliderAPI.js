export const SliderAPI = {
  parentsMap: new WeakMap(),

  createSlider($parent, options) {
    const slider = new Slider(options);
    const model = new Model(slider);
    const sliderUi = new SliderUI($parent, model);

    const sliderUiBoundedUpdate = sliderUi.update.bind(sliderUi);
    model.addSubscriber("update", sliderUiBoundedUpdate);

    this.parentsMap.set($parent, {
      slider,
      model,
      sliderUi,
    });
  },

  getOptions($parent) {
    return this.parentsMap.get($parent).model.getOptions();
  },

  setOptions($parent, options) {
    this.parentsMap.get($parent).model.update(options);
  },

};
