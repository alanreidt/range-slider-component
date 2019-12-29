import { isDivisible } from "../isDivisible/isDivisible";

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
  const isArgumentsCorrect =
    Number.isFinite(dividend) && Number.isFinite(divisor) && dividend > 0;

  if (!isArgumentsCorrect) {
    return NaN;
  }

  if (divisor <= 0) {
    return 1;
  }

  let nextDivisor = divisor;
  let prevDivisor = divisor;
  const isExtremum = nextDivisor === dividend || prevDivisor === 1;

  while (!isExtremum) {
    if (isDivisible(dividend, nextDivisor)) {
      return nextDivisor;
    }

    if (isDivisible(dividend, prevDivisor)) {
      return prevDivisor;
    }

    nextDivisor += 1;
    prevDivisor -= 1;
  }

  return dividend;
}
