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
  const validatedVariants = variants.filter(Number.isFinite);
  const areArgumentsCorrect =
    Number.isFinite(number) && validatedVariants.length;

  if (!areArgumentsCorrect) {
    return NaN;
  }

  return validatedVariants.reduce((prev, current) => {
    const currentDifference = Math.abs(number - current);
    const prevDifference = Math.abs(number - prev);

    return currentDifference <= prevDifference ? current : prev;
  });
}
