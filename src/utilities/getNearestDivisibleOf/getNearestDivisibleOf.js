/**
 * If this can be done, returns the nearest number (the bigger one, if controversial)
 * that can be divided by divisor without the remainder.
 * Otherwise, returns NaN.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 * @param {number} start The number which to start to counting from.
 * @returns {number} The nearest number, that can be divided by divisor without the remainder.
 */
export function getNearestDivisibleOf(dividend, divisor, start) {
  start = start || 0;
  const absoluteOfDivisor = Math.abs(divisor);
  dividend -= start;

  const result =
    Math.round(dividend / absoluteOfDivisor) * absoluteOfDivisor + start;

  return Number.isFinite(result) ? result : NaN;
}
