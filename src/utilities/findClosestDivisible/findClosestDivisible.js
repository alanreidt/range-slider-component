/**
 * If this can be done, returns the closest number (the bigger one, if controversial)
 * that can be divided by divisor without the remainder.
 * Otherwise, returns NaN.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 *
 * @returns {number} The closest number, that can be divided by divisor without the remainder.
 */
export function findClosestDivisible(dividend, divisor) {
  if (dividend === null) {
    return NaN;
  }

  const absoluteOfDivisor = Math.abs(divisor);

  const result = Math.round(dividend / absoluteOfDivisor) * absoluteOfDivisor;

  return Number.isFinite(result) ? result : NaN;
}
