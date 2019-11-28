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
