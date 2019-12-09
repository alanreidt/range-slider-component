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
  baseArr = baseArr && baseArr.slice().sort( (a, b) => a - b );
  arr = arr && arr.slice().sort( (a, b) => a - b );

  if ( !arr || !arr.length ) {
    return baseArr;
  }

  if ( !baseArr || !baseArr.length || (baseArr.length === arr.length) ) {
    return arr;
  }

  if ( arr.length < baseArr.length ) {
    arr.forEach( (item) => {
      const closestValue = getNearestTo(item, ...baseArr);
      const closestValuePosition = baseArr.indexOf(closestValue);

      baseArr.splice(closestValuePosition, 1, item);
    });

    arr = baseArr;
  }

  arr.length = baseArr.length;

  return arr;
}