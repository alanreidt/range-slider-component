/**
 * Defines whether a dividend can be divided by divisor without a remainder or not.
 *
 * @param {number} dividend A number, that to be divided.
 * @param {number} divisor A number, that divides the dividend.
 */
const isDivisible = function isDivisibleFromUtilities(dividend, divisor) {
  if (dividend === null) {
    return false;
  }

  return dividend % divisor === 0;
};

export default isDivisible;
