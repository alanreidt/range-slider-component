export function findValueBetween(ratio, start, end) {
  const areArgumentsCorrect = Array.from(arguments).every(Number.isFinite);

  if (!areArgumentsCorrect) {
    return NaN;
  }

  const range = end - start;

  return Math.round(range * ratio + start);
}
