export function translateProportionIntoValue(proportion, range) {
  const inputValues = [proportion].concat(range);
  const isIncorrect = inputValues.some(
    (value) => !Number.isFinite(value)
  );

  if ( isIncorrect ) {
    return NaN;
  }

  let [start, end] = range;

  if (start > end) {
    [start, end] = [end, start];
  }

  const difference = end - start;

  proportion = proportion / 100;

  return Math.round(difference * proportion + start);
}
