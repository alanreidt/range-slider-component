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
export function cross(currentValues, validatedValues) {
  currentValues = currentValues && currentValues.slice();
  validatedValues = validatedValues && validatedValues.slice();

  if ( !validatedValues || !validatedValues.length ) {
    return currentValues;
  }

  if ( !currentValues || !currentValues.length ) {
    return validatedValues;
  }

  if ( validatedValues.length < currentValues.length ) {
    validatedValues.forEach( (item) => {
      const closestValue = getNearestTo(item, ...currentValues);
      const closestValuePosition = currentValues.indexOf(closestValue);

      currentValues.splice(closestValuePosition, 1, item);
    });

    validatedValues = currentValues;
  }

  validatedValues.length = currentValues.length;

  return validatedValues;
}
