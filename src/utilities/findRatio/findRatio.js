/**
 * If this can be done, returns ratio of antecedent to consequent,
 * taking into account an offset.
 *
 * @param {number} antecedent The number, of which ratio to be counted.
 * @param {number} consequent The number, to which ratio to be counted.
 * @param {number} offset The offset of a coordinate system.
 *
 * @returns {number} Ratio of the antecedent to the consequent.
 */
export function findRatio({ antecedent, consequent, offset = 0 }) {
  const areArgumentsCorrect =
    antecedent !== null && consequent !== null && Number.isFinite(offset);

  if (!areArgumentsCorrect) {
    return NaN;
  }

  const normalizedAntecedent = antecedent - offset;
  const ratio = normalizedAntecedent / consequent;

  return ratio;
}
