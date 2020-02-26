import Model from './Model';
import ViewController from './ViewController';

/**
 * This object represents API for ControlInput.
 * All interactions with ControlInput must happen only through it.
 */
const ControlInput = {
  _parentsMap: new WeakMap(),

  /**
   * Create ControlInput instance.
   *
   * @param {HTMLElement} anchorElement An element ControlInput to be inserted in.
   * @param {Object} options Options of ControlInput.
   */
  create(anchorElement, options) {
    const model = new Model(options);
    const viewController = new ViewController(anchorElement, model);
    const viewControllerSetElementsBound = viewController.setElements.bind(
      viewController,
    );

    model.addSubscriber('update', viewControllerSetElementsBound);

    this._parentsMap.set(anchorElement, {
      model,
      viewController,
    });
  },

  /**
   * Returns ControlInput instance's current options copy. Non-primitive values are references.
   *
   * @param {HTMLElement} anchorElement An element ControlInput is inserted in.
   *
   * @returns {Object} Current options of ControlInput.
   */
  getOptions(anchorElement) {
    return this._parentsMap.get(anchorElement).model.getOptions();
  },

  /**
   * Set ControlInput instance's options.
   *
   * @param {HTMLElement} anchorElement An element ControlInput is inserted in.
   * @param {Object} options Options to be set to ControlInput.
   */
  setOptions(anchorElement, options) {
    this._parentsMap.get(anchorElement).model.setOptions(options);
  },

  /**
   * Subscribe to event, usage:
   *   menu.addSubscriber( "select", function(item) { ... } ),
   *   menu.addSubscriber( "select", obj.method(item) { ... }.bind(obj) )
   *
   * @param {string} eventName The name of an event to listen to.
   * @param {function} subscriber The subscriber to be triggered on the event.
   */
  addSubscriber(anchorElement, eventName, subscriber) {
    this._parentsMap.get(anchorElement).model.addSubscriber(eventName, subscriber);
  },

  /**
   * Cancel the subscription, usage:
   *   menu.removeSubscriber("select", subscriber)
   *
   * @param {string} eventName The name of an event to which subscriber is listen to.
   * @param {function} subscriber The subscriber to be removed from the list.
   */
  removeSubscriber(anchorElement, eventName, subscriber) {
    this._parentsMap.get(anchorElement).model.removeSubscriber(eventName, subscriber);
  },

  /**
   * Generate an event with the given name and data, usage:
   *   this.triggerSubscribers("select", data1, data2);
   *
   * @param {string} eventName The name of an event to trigger.
   * @param {any} arg1...args The data to be passed to subscribers.
   */
  triggerSubscribers(anchorElement, eventName, ...args) {
    this._parentsMap.get(anchorElement).model.triggerSubscribers(eventName, ...args);
  },
};

export default ControlInput;
