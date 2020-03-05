import SliderFactory from './SliderFactory';

/**
 * This object represents API for Slider.
 * All interactions with Slider must happen only through it.
 */
class Slider {
  constructor(anchorElement, options, Factory = SliderFactory) {
    this._Factory = Factory;
    this.model = this._Factory.createModel(options);
    this.viewController = this._Factory.createViewController(
      anchorElement,
      this.model,
    );

    const viewControllerSetElementsBound = this.viewController.setElements.bind(
      this.viewController,
    );

    this.model.addSubscriber('update', viewControllerSetElementsBound);

    this.constructor._anchorElementsMap.set(anchorElement, this);
  }

  /**
   * Create Slider instance.
   *
   * @param {HTMLElement} anchorElement An element Slider to be inserted in.
   * @param {Object} options Options of Slider.
   */
  static create(anchorElement, options, Factory) {
    return new this(anchorElement, options, Factory);
  }

  /**
   * Returns Slider instance's current options copy. Non-primitive values are references.
   *
   * @param {HTMLElement} anchorElement An element Slider is inserted in.
   *
   * @returns {Object} Current options of Slider.
   */
  static getOptions(anchorElement) {
    return this._anchorElementsMap.get(anchorElement).getOptions();
  }

  getOptions() {
    return this.model.getOptions();
  }

  /**
   * Set Slider instance's options.
   *
   * @param {HTMLElement} anchorElement An element Slider is inserted in.
   * @param {Object} options Options to be set to Slider.
   */
  static setOptions(anchorElement, options) {
    this._anchorElementsMap.get(anchorElement).setOptions(options);
  }

  setOptions(options) {
    this.model.setOptions(options);
  }

  /**
   * Set Slider instance's value of “values” option at index position.
   *
   * @param {HTMLElement} anchorElement An element Slider is inserted in.
   * @param {number} index An index of “values” option's value to change.
   * @param {number} value A value to set.
   */
  static setValueAt(anchorElement, index, value) {
    this._anchorElementsMap.get(anchorElement).setValueAt(index, value);
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
  static addSubscriber(anchorElement, eventName, subscriber) {
    this._anchorElementsMap
      .get(anchorElement)
      .addSubscriber(eventName, subscriber);
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
  static removeSubscriber(anchorElement, eventName, subscriber) {
    this._anchorElementsMap
      .get(anchorElement)
      .removeSubscriber(eventName, subscriber);
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
  static triggerSubscribers(anchorElement, eventName, ...args) {
    this._anchorElementsMap
      .get(anchorElement)
      .triggerSubscribers(eventName, ...args);
  }

  triggerSubscribers(eventName, ...args) {
    this.model.triggerSubscribers(eventName, ...args);
  }
}

Slider._anchorElementsMap = new WeakMap();

export default Slider;
