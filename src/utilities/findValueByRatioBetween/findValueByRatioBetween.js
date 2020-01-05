import { findAntecedent } from "../findAntecedent";

export function findValueByRatioBetween(ratio, start, end) {
  const areArgumentsCorrect = Array.from(arguments).every(Number.isFinite);

  if (!areArgumentsCorrect) {
    return NaN;
  }

  const range = end - start;

  return Math.round(findAntecedent(range, ratio, start));
}
