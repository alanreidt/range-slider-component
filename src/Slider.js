import SliderFactory from './SliderFactory';

/**
 * This object represents API for Slider.
 * All interactions with Slider must happen only through it.
 */
class Slider {
  constructor(parent, options, Factory = SliderFactory) {
    this._factory = Factory;
    this.model = this._factory.createModel(options);
    this.viewController = this._factory.createViewController(
      parent,
      this.model,
    );

    const viewControllerSetElementsBound = this.viewController.setElements.bind(
      this.viewController,
    );

    this.model.addSubscriber('update', viewControllerSetElementsBound);
  }

  /**
   * Create Slider instance.
   *
   * @param {HTMLElement} parent An element Slider to be inserted in.
   * @param {Object} options Options of Slider.
   */
  static create(parent, options) {
    const slider = new this(parent, options);

    this._parentsMap.set(parent, slider);

    return slider;
  }

  /**
   * Returns Slider instance's current options copy. Non-primitive values are references.
   *
   * @param {HTMLElement} parent An element Slider is inserted in.
   *
   * @returns {Object} Current options of Slider.
   */
  static getOptions(parent) {
    return this._parentsMap.get(parent).getOptions();
  }

  getOptions() {
    return this.model.getOptions();
  }

  /**
   * Set Slider instance's options.
   *
   * @param {HTMLElement} parent An element Slider is inserted in.
   * @param {Object} options Options to be set to Slider.
   */
  static setOptions(parent, options) {
    this._parentsMap.get(parent).setOptions(options);
  }

  setOptions(options) {
    this.model.setOptions(options);
  }

  /**
   * Set Slider instance's value of “values” option at index position.
   *
   * @param {HTMLElement} parent An element Slider is inserted in.
   * @param {number} index An index of “values” option's value to change.
   * @param {number} value A value to set.
   */
  static setValueAt(parent, index, value) {
    this._parentsMap.get(parent).setValueAt(index, value);
  }

  setValueAt(index, value) {
    this.model.setValueAt(index, value);
  }

  /**
   * Subscribe to event, usage:
   *   menu.addSubscriber( "select", function(item) { ... } ),
   *   menu.addSubscriber( "select", obj.method(item) { ... }.bind(obj) )
   *
   * @param {string} eventName The name of an event to listen to.
   * @param {function} subscriber The subscriber to be triggered on the event.
   */
  static addSubscriber(parent, eventName, subscriber) {
    this._parentsMap.get(parent).addSubscriber(eventName, subscriber);
  }

  addSubscriber(eventName, subscriber) {
    this.model.addSubscriber(eventName, subscriber);
  }

  /**
   * Cancel the subscription, usage:
   *   menu.removeSubscriber("select", subscriber)
   *
   * @param {string} eventName The name of an event to which subscriber is listen to.
   * @param {function} subscriber The subscriber to be removed from the list.
   */
  static removeSubscriber(parent, eventName, subscriber) {
    this._parentsMap.get(parent).removeSubscriber(eventName, subscriber);
  }

  removeSubscriber(eventName, subscriber) {
    this.model.removeSubscriber(eventName, subscriber);
  }

  /**
   * Generate an event with the given name and data, usage:
   *   this.triggerSubscribers("select", data1, data2);
   *
   * @param {string} eventName The name of an event to trigger.
   * @param {any} arg1...args The data to be passed to subscribers.
   */
  static triggerSubscribers(parent, eventName, ...args) {
    this._parentsMap.get(parent).triggerSubscribers(eventName, ...args);
  }

  triggerSubscribers(eventName, ...args) {
    this.model.triggerSubscribers(eventName, ...args);
  }
}

Slider._parentsMap = new WeakMap();

export default Slider;
