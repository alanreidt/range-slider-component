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
