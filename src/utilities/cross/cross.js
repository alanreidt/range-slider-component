import { getNearestTo } from "../getNearestTo/getNearestTo";

/**
 * Cross arrays' items, regarding first array as a base.
 *
 * @param {array} baseArr The base array. Its length to be preserved.
 * @param {array} arr The array to be crossed in.
 *
 * @returns {array} The crossed array.
 *
 */
export function cross(baseArr, arr) {
  const baseArrCopy = baseArr && baseArr.slice().sort((a, b) => a - b);
  let arrCopy = arr && arr.slice().sort((a, b) => a - b);

  if (!arrCopy || !arrCopy.length) {
    return baseArr;
  }

  if (
    !baseArrCopy ||
    !baseArrCopy.length ||
    baseArrCopy.length === arrCopy.length
  ) {
    return arrCopy;
  }

  if (arrCopy.length < baseArrCopy.length) {
    arrCopy.forEach((item) => {
      const closestValue = getNearestTo(item, ...baseArrCopy);
      const closestValuePosition = baseArrCopy.indexOf(closestValue);

      baseArrCopy.splice(closestValuePosition, 1, item);
    });

    arrCopy = baseArrCopy;
  }

  arrCopy.length = baseArrCopy.length;

  return arrCopy;
}
