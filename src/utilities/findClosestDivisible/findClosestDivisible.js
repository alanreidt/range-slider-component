/**
 * If this can be done, returns the closest number (the bigger one, if controversial)
 * that can be divided by divisor without remainder.
 * Otherwise, returns NaN.
 *
 * @param {number} dividend A number, that to be divided.
 * @param {number} divisor A number, that divides the dividend.
 *
 * @returns {number} The closest divisible number between the dividend and the divisor.
 */
const findClosestDivisible = function findClosestDivisibleFromUtilities(
  dividend,
  divisor,
) {
  if (dividend === null) {
    return NaN;
  }

  const absoluteOfDivisor = Math.abs(divisor);

  const result = Math.round(dividend / absoluteOfDivisor) * absoluteOfDivisor;

  return Number.isFinite(result) ? result : NaN;
};

export default findClosestDivisible;
