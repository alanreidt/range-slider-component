export function setElementPosition(element, position) {
  element.style.left = position;

  return element;
}


export function setElementTextContent(element, value) {
  element.textContent = value;

  return element;
}


export function setElementsPosition(elements, positions) {
  elements.forEach(
    call(setElementPosition, positions)
  );
}


export function setElementsTextContent(elements, values) {
  elements.forEach(
    call(setElementTextContent, values)
  );
}


/**
 * A wrapper function, that is used alongwith Array.prototype.forEach method.
 * It calls callback function on each element of the array, passing item
 * of the values array on each iteration.
 *
 * @param {function} callback The function, to be called on each element
 * of the array.
 * @param {array} values The values, to be passed to the callback
 * on each iteration.
 */

export function call(callback, values) {

  return (element, i) => {
    const value = values[i];

    callback(element, value);
  }

}


/**
 * The observerMixin is a modification of eventMixin,
 * borrowed from http://javascript.info/mixins
 */

export let observerMixin = {

  /**
   * Subscribe to event, usage:
   *  menu.addSubscriber("select", object)
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
   */

  removeSubscriber(eventName, subscriber) {
    let subscribers = this._eventSubscribers && this._eventSubscribers[eventName];

    if (!subscribers) return;

    for (let i = 0; i < subscribers.length; i++) {

      if (subscribers[i] === subscriber) {
        subscribers.splice(i--, 1);
      }

    }
  },


  /**
   * Generate an event with the given name and data
   *  this.notify("select", data1, data2);
   */

  notify(eventName, ...args) {
    if (!this._eventSubscribers || !this._eventSubscribers[eventName]) {
      return;
    }

    this._eventSubscribers[eventName].forEach( subscriber => subscriber.update(args) );
  }
};


/**
 * Returns position of the value in the range in percentages, if it's possible.
 * Otherwise, returns NaN
 *
 * @param {number} value The value, which position to be calculated.
 * @param {number[]} range The range, whick value is compared to.
 * @returns {number} The position of the value in percentages.
 */

export function getPositionInPercentageOf(value, range) {
  let [start, end] = range;

  if (start > end) {
    [start, end] = [end, start];
  }

  if ( !isValueInBetween(value, start, end) ) {
    return NaN;
  }

  let difference = end - start;

  value = value - start;

  let result = value / difference * 100;

  return `${( result - Math.trunc(result) ) ? result.toFixed(5) : result}%`;
}


/**
 * Defines whether value is between start and end or not.
 *
 * @param {number} value The value, which is checked for attachment to interval.
 * @param {number} start The start of the interval.
 * @param {number} end The end of the interval.
 * @returns {boolean} True, if value is between start and end, false otherwise.
 */

export function isValueBetween(value, start, end) {
  if ( Array.from(arguments).includes(null) ) return false;

  if (start > end) {
    [start, end] = [end, start];
  }

  return (value > start) && (value < end);
}


/**
 * Defines whether value is between start and end, including the edges, or not.
 *
 * @param {number} value The value, which is checked for attachment to interval.
 * @param {number} start The start of the interval.
 * @param {number} end The end of the interval.
 * @returns {boolean} True, if value is between start and end, including the edges, false otherwise.
 */

export function isValueInBetween(value, start, end) {
  if ( [].includes.call(arguments, null) ) return false;

  if (start > end) {
    [start, end] = [end, start];
  }

  return (value >= start) && (value <= end);
}


/**
 * Defines whether dividend can be divided by divisor without the remainder or not.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 * @param {number} start The number which to start to counting from.
 * @returns {boolean} True, if dividend can be divided by divisor without the remainder. Otherwise, false.
 */

export function isDivisible(dividend, divisor, start = 0) {
  return (dividend - start) % divisor === 0;
}


/**
 * If this can be done, returns the number that is nearest to the value.
 * Otherwise, returns NaN.
 *
 * @param {number} value The value, which nearest number is compared to.
 * @param {number} args The number, that is compared to the value.
 * @returns {number} The nearest number to the value.
 * @returns {NaN} Error.
 */

export function getNearestTo(value, ...args) {
  if ( !Number.isFinite(value) ) return NaN;

  let filteredArray = args.filter( item => Number.isFinite(item) );

  if (!filteredArray.length) return NaN;

  let result = filteredArray.reduce( (prev, current) => {
    let currentDifference = Math.abs(value - current);
    let prevDifference = Math.abs(value - prev);

    return (currentDifference <= prevDifference) ? current : prev;
  });

  return Number.isFinite(result) ? result : NaN;
}


/**
 * If this can be done, returns the nearest number (the bigger one, if controvertial)
 * that can be divided by divisor without the remainder.
 * Otherwise, returns NaN.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 * @param {number} start The number which to start to counting from.
 * @returns {number} The nearest number, that can be divided by divisor without the remainder.
 */

export function getNearestDivisibleOf(dividend, divisor, start = 0) {
  divisor = Math.abs(divisor);
  dividend -= start;

  let result = Math.round(dividend / divisor) * divisor + start;

  return isFinite(result) ? result : NaN;
}

export function getNextDivisibleOf(dividend, divisor, start = 0) {
  divisor = Math.abs(divisor);
  dividend -= start;

  let result = Math.ceil(dividend / divisor) * divisor + start;

  return isFinite(result) ? result : undefined;
}

export function getPrevDivisibleOf(dividend, divisor, start = 0) {
  divisor = Math.abs(divisor);
  dividend -= start;

  let result = Math.floor(dividend / divisor) * divisor + start;

  return isFinite(result) ? result : undefined;
}


/**
 * If this can be done, returns the closest factor (natural number (positive integer))
 * of the dividend to the divisor (the bigger one, if controvertial).
 * Otherwise, returns NaN.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 * @returns {natural number} The closest factor of the dividend to the divisor.
 */

export function getClosestFactorOf(dividend, divisor) {
  if ( !Number.isFinite(dividend) || !Number.isFinite(divisor) || (dividend <= 0) ) return NaN;

  if (divisor <= 0) return 1;

  for (let i = 0; i < dividend; i++) {
    if ( dividend % (divisor + i) === 0 ) {
      return (divisor + i);
    }

    if ( dividend % (divisor - i) === 0 ) {
      return (divisor - i);
    }
  }

  return dividend;
}


/**
 * Returns excess over step, if this can be done,
 * taking into account starting point.
 * Otherwise, returns undefined.
 *
 * @param {number} value The number which step is compared with.
 * @param {number} step The number that represents a value of step.
 * @param {number} start The number which step starts to counting from.
 * @returns {number} The excess of value over step.
 * @returns {undefined} The Error of operation.
 */

export function getOverstepOf(value, step, start) {
  start = isFinite(start) ? start : 0;

  if ( (value < start) || !isFinite(step) ) return;

  let overstep = (value - start) % step;

  return isNaN(overstep) ? undefined : overstep;
}


export function getAverageOf(arr) {
  return arr.reduce( (sum, current) => sum + current, 0 ) / arr.length;
}
