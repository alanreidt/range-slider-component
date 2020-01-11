/**
 * Defines whether dividend can be divided by divisor without the remainder or not.
 *
 * @param {number} dividend A number, that to be divided.
 * @param {number} divisor A number, that divides the dividend.
 */
export function isDivisible(dividend, divisor) {
  if (dividend === null) {
    return false;
  }

  return dividend % divisor === 0;
}
