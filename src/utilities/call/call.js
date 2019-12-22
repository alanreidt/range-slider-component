/**
 * A wrapper function, that is used alongwith Array.prototype.forEach method.
 * It calls callback function on each element of the array, passing item
 * of the values array on each iteration.
 *
 * @param {function} callback The function, to be called on each element
 * of the array.
 * @param {array} values The values, to be passed to the callback
 * on each iteration.
 * @param {any} flag The argument, which is the same for each callback call.
 */
export function call(callback, values, flag) {
  return (element, i) => {
    const value = values[i];

    callback(element, value, flag);
  };
}
