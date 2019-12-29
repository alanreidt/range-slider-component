/**
 * Defines whether dividend can be divided by divisor without the remainder or not.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 */
export function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}
