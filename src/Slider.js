import SliderFactory from './SliderFactory';

/**
 * This object represents API for the Slider.
 * All interactions with the Slider must happen only through it.
 */
const Slider = {
  _factory: SliderFactory,
  _parentsMap: new WeakMap(),

  /**
   * Create the Slider instance.
   *
   * @param {HTMLElement} parent An element the Slider to be inserted in.
   * @param {Object} options Options of the Slider.
   */
  create(parent, options) {
    const model = this._factory.createModel(options);
    const viewController = this._factory.createViewController(parent, model);
    const viewControllerSetElementsBound = viewController.setElements.bind(
      viewController,
    );

    model.addSubscriber('update', viewControllerSetElementsBound);

    this._parentsMap.set(parent, {
      model,
      viewController,
    });
  },

  /**
   * Returns the Slider instance's current options. Non-primitive values are references.
   *
   * @param {HTMLElement} parent An element the Slider is inserted in.
   *
   * @returns {Object} Current options of the Slider.
   */
  getOptions(parent) {
    return this._parentsMap.get(parent).model.getOptions();
  },

  /**
   * Set the Slider instance's options.
   *
   * @param {HTMLElement} parent An element the Slider is inserted in.
   * @param {Object} options Options to be set to the Slider.
   */
  setOptions(parent, options) {
    this._parentsMap.get(parent).model.setOptions(options);
  },

  /**
   * Set the Slider instance's value of “values” option at index position.
   *
   * @param {HTMLElement} parent An element the Slider is inserted in.
   * @param {number} index An index of “values” option's value to change.
   * @param {number} value A value to set.
   */
  setValueAt(parent, index, value) {
    this._parentsMap.get(parent).model.setValueAt(index, value);
  },

  /**
   * Subscribe to event, usage:
   *   menu.addSubscriber( "select", function(item) { ... } ),
   *   menu.addSubscriber( "select", obj.method(item) { ... }.bind(obj) )
   *
   * @param {string} eventName The name of an event to listen to.
   * @param {function} subscriber The subscriber to be triggered on the event.
   */
  addSubscriber(parent, eventName, subscriber) {
    this._parentsMap.get(parent).model.addSubscriber(eventName, subscriber);
  },

  /**
   * Cancel the subscription, usage:
   *   menu.removeSubscriber("select", subscriber)
   *
   * @param {string} eventName The name of an event to which subscriber is listen to.
   * @param {function} subscriber The subscriber to be removed from the list.
   */
  removeSubscriber(parent, eventName, subscriber) {
    this._parentsMap.get(parent).model.removeSubscriber(eventName, subscriber);
  },

  /**
   * Generate an event with the given name and data, usage:
   *   this.triggerSubscribers("select", data1, data2);
   *
   * @param {string} eventName The name of an event to trigger.
   * @param {any} arg1...args The data to be passed to subscribers.
   */
  triggerSubscribers(parent, eventName, ...args) {
    this._parentsMap.get(parent).model.triggerSubscribers(eventName, ...args);
  },
};

export default Slider;
