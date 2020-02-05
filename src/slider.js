import { sliderFactory } from "./sliderFactory";

/**
 * This object represents API for the slider.
 * All interactions with the slider must happen only through it.
 */
export const slider = {
  _factory: sliderFactory,
  _parentsMap: new WeakMap(),

  /**
   * Create the slider instance.
   *
   * @param {HTMLElement} parent An element the slider to be inserted in.
   * @param {Object} options Options of the slider.
   */
  create(parent, options) {
    const model = this._factory.createModel(options);
    const viewController = this._factory.createUI(parent, model);

    const viewControllerSetElementsBound = viewController.setElements.bind(
      viewController,
    );
    model.addSubscriber("update", viewControllerSetElementsBound);

    this._parentsMap.set(parent, {
      model,
      viewController,
    });
  },

  /**
   * Returns the slider instance's current options. Non-primitive values are references.
   *
   * @param {HTMLElement} parent An element the slider is inserted in.
   *
   * @returns {Object} Current options of the slider.
   */
  getOptions(parent) {
    return this._parentsMap.get(parent).model.getOptions();
  },

  /**
   * Set the slider instance's options.
   *
   * @param {HTMLElement} parent An element the slider is inserted in.
   * @param {Object} options Options to be set to the slider.
   */
  setOptions(parent, options) {
    this._parentsMap.get(parent).model.setOptions(options);
  },

  /**
   * Set the slider instance's value of “values” option at index position.
   *
   * @param {HTMLElement} parent An element the slider is inserted in.
   * @param {number} index An index of “values” option's value to change.
   * @param {number} value A value to set.
   */
  setValueAt(parent, index, value) {
    this._parentsMap.get(parent).model.setValueAt(index, value);
  },
};
