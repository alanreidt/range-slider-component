/**
 * If this can be done, returns the closest factor (natural number (positive integer))
 * of division (the bigger one, if controversial).
 * Otherwise, returns NaN.
 *
 * @param {number} dividend The number, that to be divided.
 * @param {number} divisor The number, that divides the dividend.
 *
 * @returns {number} The closest factor (natural number (positive integer)) of the division.
 */
export function findClosestFactor(dividend, divisor) {
  if (
    !Number.isFinite(dividend) ||
    !Number.isFinite(divisor) ||
    dividend <= 0
  ) {
    return NaN;
  }

  if (divisor <= 0) return 1;

  for (let i = 0; i < dividend; i += 1) {
    if (dividend % (divisor + i) === 0) {
      return divisor + i;
    }

    if (dividend % (divisor - i) === 0) {
      return divisor - i;
    }
  }

  return dividend;
}
