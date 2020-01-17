import { sliderFactory } from "./sliderFactory";

/**
 * This object represents API for the slider.
 * All interactions with the slider must happen only through it.
 *
 */

export const slider = {
  _factory: sliderFactory,
  _parentsMap: new WeakMap(),

  /**
   * Create slider instance.
   *
   * @param {HTMLElement} $parent The element slider to be inserted in.
   * @param {object} options The options of the slider.
   *
   */

  create($parent, options) {
    const model = this._factory.createModel(options);
    const viewController = this._factory.createUI($parent, model);

    const viewControllerSetElementsBound = viewController.setElements.bind(
      viewController,
    );
    model.addSubscriber("update", viewControllerSetElementsBound);

    this._parentsMap.set($parent, {
      model,
      viewController,
    });
  },

  /**
   * Returns the slider instance current options. Non-primitive values are references.
   *
   * @param {HTMLElement} $parent The element the slider is inserted in.
   *
   * @returns {object} options The current options of the slider.
   *
   */

  getOptions($parent) {
    return this._parentsMap.get($parent).model.getOptions();
  },

  /**
   * Set the slider instance options.
   *
   * @param {HTMLElement} $parent The element the slider is inserted in.
   * @param {object} options The options to be set to the slider.
   *
   */

  setOptions($parent, options) {
    this._parentsMap.get($parent).model.setOptions(options);
  },

  /**
   * Set the slider instance value of values option at appropriate index.
   *
   * @param {HTMLElement} $parent The element the slider is inserted in.
   * @param {number} index The index of values option value to change.
   * @param {number} value The new value.
   *
   */

  setValueAt($parent, index, value) {
    this._parentsMap.get($parent).model.setValueAt(index, value);
  },
};
