import { findAntecedent } from "../../utilities/findAntecedent";

export function findValueByRatioBetween(ratio, start, end) {
  const areArgumentsCorrect = end !== null;

  if (!areArgumentsCorrect) {
    return NaN;
  }

  const range = end - start;

  return findAntecedent(range, ratio, start);
}
