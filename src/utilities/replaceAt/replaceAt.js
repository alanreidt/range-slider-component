/**
 * Replace a value of an array at index.
 *
 * @param {number} index An index of a value to be replaced.
 * @param {any} value A new value.
 * @param {array} array An array, which value to be replaced.
 *
 * @returns {array} The array with replaced value.
 */
export function replaceAt(index, value, array) {
  const result = array.slice();

  result.splice(index, 1, value);

  return result;
}
