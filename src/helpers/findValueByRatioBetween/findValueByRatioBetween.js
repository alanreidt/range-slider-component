import { findAntecedent } from "../../utilities/findAntecedent";

/**
 * Returns value between start and end, via known ratio, if it's possible.
 * Otherwise, returns NaN.
 *
 * @param {number} ratio A ratio between desired value and range (a difference between start and end).
 * @param {number} start A start of the range, where value to be found.
 * @param {number} end An end of the range, where value to be found.
 *
 * @returns {number} A value between the start and the end.
 */
export function findValueByRatioBetween(ratio, start, end) {
  const areArgumentsCorrect = end !== null;

  if (!areArgumentsCorrect) {
    return NaN;
  }

  const range = end - start;

  return findAntecedent(range, ratio, start);
}
