import { findClosestTo } from "../findClosestTo/findClosestTo";

/**
 * Cross arrays' items, regarding first array as a base.
 * Each base array item, closest to crossing array item will be replaced by it.
 *
 * @param {array} baseArray A base array. Its length to be preserved.
 * @param {array} crossingArray An array to be crossed in.
 *
 * @returns {array} A crossed array.
 */
export function cross(baseArray, crossingArray) {
  const isArrayCorrect = (array) => array && array.length;
  const ascending = (a, b) => a - b;

  const baseArrayCopy = baseArray && baseArray.slice().sort(ascending);
  let crossingArrayCopy =
    crossingArray && crossingArray.slice().sort(ascending);

  if (!isArrayCorrect(crossingArrayCopy)) {
    return baseArray;
  }

  if (
    !isArrayCorrect(baseArrayCopy) ||
    baseArrayCopy.length === crossingArrayCopy.length
  ) {
    return crossingArrayCopy;
  }

  if (crossingArrayCopy.length < baseArrayCopy.length) {
    const variants = baseArrayCopy.slice();

    crossingArrayCopy.forEach((item) => {
      const closestValue = findClosestTo(item, ...variants);
      const closestValueIndexInBaseArray = baseArrayCopy.indexOf(closestValue);
      const closestValueIndexInVariants = variants.indexOf(closestValue);

      baseArrayCopy.splice(closestValueIndexInBaseArray, 1, item);
      variants.splice(0, closestValueIndexInVariants + 1);
    });

    crossingArrayCopy = baseArrayCopy;
  }

  crossingArrayCopy.length = baseArrayCopy.length;

  return crossingArrayCopy.sort(ascending);
}
