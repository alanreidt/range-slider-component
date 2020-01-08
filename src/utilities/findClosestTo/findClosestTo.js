/**
 * If this can be done, returns a number from the variants, that is closest to the number.
 * Otherwise, returns NaN.
 *
 * @param {number} number The number, to which the variants are compared to.
 * @param {...number} variants The variants, from which result to be taken.
 *
 * @returns {number} A closest number.
 */
export function findClosestTo(number, ...variants) {
  if (!Number.isFinite(number)) return NaN;

  const filteredArray = variants.filter((item) => Number.isFinite(item));

  if (!filteredArray.length) return NaN;

  const result = filteredArray.reduce((prev, current) => {
    const currentDifference = Math.abs(number - current);
    const prevDifference = Math.abs(number - prev);

    return currentDifference <= prevDifference ? current : prev;
  });

  return Number.isFinite(result) ? result : NaN;
}
