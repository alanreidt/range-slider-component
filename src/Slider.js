import SliderFactory from './SliderFactory';

/**
 * This class represents API for Slider.
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
   * @param {HTMLElement} anchorElement An element the Slider instance to be inserted in.
   * @param {Object} options Options for Slider instance.
   *
   * @returns {Slider} the Slider instance.
   */
  static create(anchorElement, options, Factory) {
    return new this(anchorElement, options, Factory);
  }

  /**
   * Returns Slider instance's current options copy. Non-primitive values are references.
   *
   * @param {HTMLElement} sliderElement An element the Slider instance was inserted in.
   *
   * @returns {Object} Current options of the Slider instance.
   */
  static getOptions(sliderElement) {
    return this._anchorElementsMap.get(sliderElement).getOptions();
  }

  getOptions() {
    return this.model.getOptions();
  }

  /**
   * Set Slider instance's options.
   *
   * @param {HTMLElement} sliderElement An element the Slider instance was inserted in.
   * @param {Object} options Options to be set to the Slider instance.
   */
  static setOptions(sliderElement, options) {
    this._anchorElementsMap.get(sliderElement).setOptions(options);
  }

  setOptions(options) {
    this.model.setOptions(options);
  }

  /**
   * Set Slider instance's value of “values” option at index position.
   *
   * @param {HTMLElement} sliderElement An element the Slider instance was inserted in.
   * @param {number} index An index of “values” option's value to change.
   * @param {number} value A value to set.
   */
  static setValueAt(sliderElement, index, value) {
    this._anchorElementsMap.get(sliderElement).setValueAt(index, value);
  }

  setValueAt(index, value) {
    this.model.setValueAt(index, value);
  }

  /**
   * Subscribe to event, usage:
   *   menu.addSubscriber( "select", function(item) { ... } ),
   *   menu.addSubscriber( "select", obj.method(item) { ... }.bind(obj) )
   *
   * @param {HTMLElement} sliderElement An element the Slider instance was inserted in.
   * @param {string} eventName A name of an event to listen to.
   * @param {function} subscriber The subscriber to be triggered on the event.
   */
  static addSubscriber(sliderElement, eventName, subscriber) {
    this._anchorElementsMap
      .get(sliderElement)
      .addSubscriber(eventName, subscriber);
  }

  addSubscriber(eventName, subscriber) {
    this.model.addSubscriber(eventName, subscriber);
  }

  /**
   * Cancel the subscription, usage:
   *   menu.removeSubscriber("select", subscriber)
   *
   * @param {HTMLElement} sliderElement An element the Slider instance was inserted in.
   * @param {string} eventName The name of the event to which subscriber listens to.
   * @param {function} subscriber The subscriber to be removed from the list.
   */
  static removeSubscriber(sliderElement, eventName, subscriber) {
    this._anchorElementsMap
      .get(sliderElement)
      .removeSubscriber(eventName, subscriber);
  }

  removeSubscriber(eventName, subscriber) {
    this.model.removeSubscriber(eventName, subscriber);
  }

  /**
   * Generate an event with the given name and data, usage:
   *   this.triggerSubscribers("select", data1, data2);
   *
   * @param {HTMLElement} sliderElement An element the Slider instance was inserted in.
   * @param {string} eventName The name of the event to trigger.
   * @param {any} arg1...args A data to be passed to subscribers.
   */
  static triggerSubscribers(sliderElement, eventName, ...args) {
    this._anchorElementsMap
      .get(sliderElement)
      .triggerSubscribers(eventName, ...args);
  }

  triggerSubscribers(eventName, ...args) {
    this.model.triggerSubscribers(eventName, ...args);
  }
}

Slider._anchorElementsMap = new WeakMap();

export default Slider;
