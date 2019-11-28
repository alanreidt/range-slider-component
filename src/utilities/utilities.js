export { call } from "./call";
export { setElementTextContent } from "./setElementTextContent";
export { setElementPosition } from "./setElementPosition";
export { getOverstepOf } from "./getOverstepOf";
export { getNearestDivisibleOf } from "./getNearestDivisibleOf";
export { getNearestTo } from "./getNearestTo";
export { isValueBetween } from "./isValueBetween";
export { translateProportionIntoValue } from "./translateProportionIntoValue";
export { getPositionInPercentageOf } from "./getPositionInPercentageOf";
export { getClosestFactorOf } from "./getClosestFactorOf";
export { getAverageOf } from "./getAverageOf";
export { getNextDivisibleOf } from "./getNextDivisibleOf";
export { getPrevDivisibleOf } from "./getPrevDivisibleOf";
export { isDivisible } from "./isDivisible";
export { isValueInBetween } from "./isValueInBetween";


export function setElementsPosition(elements, positions, property) {
  elements.forEach(
    call(setElementPosition, positions, property)
  );
}


export function setElementsTextContent(elements, values) {
  elements.forEach(
    call(setElementTextContent, values)
  );
}


/**
 * The observerMixin is a modification of eventMixin,
 * borrowed from http://javascript.info/mixins
 */

export let observerMixin = {

  /**
   * Subscribe to event, usage:
   *  menu.addSubscriber( "select", function(item) { ... } ),
   *  menu.addSubscriber( "select", obj.method(item) { ... }.bind(obj) )
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
   *  menu.removeSubscriber("select", subscriber)
   *
   * @param {string} eventName The name of an event to which subscriber is listen to.
   * @param {function} subscriber The subscriber to be removed from the list.
   */

  removeSubscriber(eventName, subscriber) {
    let subscribers = this._eventSubscribers && this._eventSubscribers[eventName];

    if (!subscribers) return;

    subscribers.forEach( (item, i) => {
      if (item !== subscriber) return;

      subscribers.splice(i--, 1);
    });
  },


  /**
   * Generate an event with the given name and data
   *  this.triggerSubscribers("select", data1, data2);
   *
   * @param {string} eventName The name of an event to trigger.
   * @param {any} arg1...args The data to be passed to subscribers.
   */

  triggerSubscribers(eventName, ...args) {
    let subscribers = this._eventSubscribers && this._eventSubscribers[eventName];

    if (!subscribers) return;

    subscribers.forEach( (subscriber) => subscriber.apply(this, args) );
  }
};
