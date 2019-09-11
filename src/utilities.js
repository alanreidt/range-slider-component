/**
 * Defines whether dividend is dividing by divisor without the remainder.
 *
 * @param {number} dividend The number, that is divided.
 * @param {number} divisor The number, that divides the dividend.
 * @param {number} start The number, that represents starting point of coordinate system. (???)
 * @returns {boolean} ???
 */

export function isDivisible(dividend, divisor, start = 0) {
  return (dividend - start) % divisor === 0;
}

/**
 * If this can be done, returns the nearest number (the bigger one, if controvertial)
 * that is dividing by divisor without the remainder.
 * Otherwise, returns undefined.
 *
 * @param {number} dividend The number, that is divided.
 * @param {number} divisor The number, that divides the dividend.
 * @param {number} start The number, that represents starting point of coordinate system. (???)
 * @returns {number} The nearest number, that is dividing by divisor without the remainder.
 * @returns {undefined} The Error of operation, including: division by 0, incorrect parameters.
 */

export function getNearestDivisibleOf(dividend, divisor, start = 0) {
  let rem = (dividend - start) % divisor; // function
  let lack = divisor - rem; // function
  let nextDivisible = dividend + lack; // function
  let prevDivisible = dividend - rem; // function
  // (nextDivisible - dividend) < (dividend - prevDivisible): function

  let nearestDivisible = ( (nextDivisible - dividend) > (dividend - prevDivisible) ) ? prevDivisible :
  nextDivisible; // function

  if ( isNaN(nearestDivisible) ) return;

  return nearestDivisible;
}


/**
 * Returns excess over step, if this can be done,
 * taking into account starting point.
 * Otherwise, returns NaN.
 *
 * @param {number} value The number which step is compared with.
 * @param {number} step The number that represents a value of step.
 * @param {number} start The number which step starts to counting from.
 * @returns {number} The excess of value over step.
 * @returns {NaN} The Error of operation, including: zero step, incorrect parameters.
 */

export function getOverstepOf(value, step, start = 0) {
  let overstep = (value - start) % step;

  return isNaN(overstep)? undefined : overstep;
}


export function getAverageOf(arr) {
  return arr.reduce( (sum, current) => sum + current, 0 ) / arr.length;
}
