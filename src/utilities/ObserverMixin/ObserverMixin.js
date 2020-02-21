/**
 * The ObserverMixin is a modification of eventMixin,
 * borrowed from http://javascript.info/mixins
 */
const ObserverMixin = {
  /**
   * Subscribe to event, usage:
   *   menu.addSubscriber( "select", function(item) { ... } ),
   *   menu.addSubscriber( "select", obj.method(item) { ... }.bind(obj) )
   *
   * @param {string} eventName The name of an event to listen to.
   * @param {function} subscriber The subscriber to be triggered on the event.
   */
  addSubscriber(eventName, subscriber) {
    if (!this._eventSubscribers) {
      this._eventSubscribers = {};
    }

    if (!this._eventSubscribers[eventName]) {
      this._eventSubscribers[eventName] = [];
    }

    this._eventSubscribers[eventName].push(subscriber);
  },

  /**
   * Cancel the subscription, usage:
   *   menu.removeSubscriber("select", subscriber)
   *
   * @param {string} eventName The name of an event to which subscriber is listen to.
   * @param {function} subscriber The subscriber to be removed from the list.
   */
  removeSubscriber(eventName, subscriber) {
    const subscribers =
      this._eventSubscribers && this._eventSubscribers[eventName];

    if (!subscribers) return;

    subscribers.forEach((item, i) => {
      if (item !== subscriber) return;

      subscribers.splice(i, 1);
    });
  },

  /**
   * Generate an event with the given name and data, usage:
   *   this.triggerSubscribers("select", data1, data2);
   *
   * @param {string} eventName The name of an event to trigger.
   * @param {any} arg1...args The data to be passed to subscribers.
   */
  triggerSubscribers(eventName, ...args) {
    const subscribers =
      this._eventSubscribers && this._eventSubscribers[eventName];

    if (!subscribers) return;

    subscribers.forEach((subscriber) => subscriber.apply(this, args));
  },
};

export default ObserverMixin;
