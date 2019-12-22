export function translateProportionIntoValue(proportion, range) {
  const isArgumentsCorrect = Array.from(arguments).every((argument) =>
    Number.isFinite(parseFloat(argument)),
  );

  if (!isArgumentsCorrect) {
    return NaN;
  }

  let [start, end] = range;

  if (start > end) {
    [start, end] = [end, start];
  }

  const difference = end - start;

  proportion /= 100;

  return Math.round(difference * proportion + start);
}
