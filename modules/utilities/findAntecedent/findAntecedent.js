/**
 * The derivative of the findRatio function.
 * If this can be done, returns an antecedent of the ratio,
 * taking into account an offset of a 1D coordinate system.
 * Otherwise, returns NaN.
 *
 * @param {number} consequent The second member of a ratio.
 * @param {number} ratio A ratio between the antecedent and the consequent.
 * @param {number} offset An offset of a 1D coordinate system.
 *
 * @returns {number} An antecedent of the ratio.
 */
const findAntecedent = function findAntecedentFromUtilities(
  consequent,
  ratio,
  offset = 0,
) {
  const areArgumentsCorrect =
    consequent !== null && ratio !== null && Number.isFinite(offset);

  if (!areArgumentsCorrect) {
    return NaN;
  }

  return consequent * ratio + offset;
};

export default findAntecedent;
