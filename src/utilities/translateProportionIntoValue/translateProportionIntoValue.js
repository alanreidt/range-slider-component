export function translateProportionIntoValue(proportion, range) {
  let [start, end] = range;

  if (start > end) {
    [start, end] = [end, start];
  }

  const difference = end - start;

  proportion = proportion / 100;

  return difference * proportion + start;
}
