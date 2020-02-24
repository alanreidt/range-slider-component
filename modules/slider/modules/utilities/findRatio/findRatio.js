/**
 * If this can be done, returns ratio between 2 numbers,
 * taking into account an offset of a 1D coordinate system.
 * Otherwise, returns NaN.
 *
 * @param {number} antecedent The first member of a ratio.
 * @param {number} consequent The second member of a ratio.
 * @param {number} offset An offset of a 1D coordinate system.
 *
 * @returns {number} A ratio between 2 numbers.
 */
const findRatio = function findRatioFromUtilities(
  antecedent,
  consequent,
  offset = 0,
) {
  const areArgumentsCorrect =
    antecedent !== null && consequent !== null && Number.isFinite(offset);

  if (!areArgumentsCorrect) {
    return NaN;
  }

  const normalizedAntecedent = antecedent - offset;
  const ratio = normalizedAntecedent / consequent;

  return ratio;
};

export default findRatio;
