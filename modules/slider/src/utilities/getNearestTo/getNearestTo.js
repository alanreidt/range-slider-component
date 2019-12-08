/**
 * If this can be done, returns the number that is nearest to the value.
 * Otherwise, returns NaN.
 *
 * @param {number} value The value, which nearest number is compared to.
 * @param {number} args The number, that is compared to the value.
 * @returns {number} The nearest number to the value.
 * @returns {NaN} Error.
 */
export function getNearestTo(value, ...args) {
  if (!Number.isFinite(value))
    return NaN;
  let filteredArray = args.filter(item => Number.isFinite(item));
  if (!filteredArray.length)
    return NaN;
  let result = filteredArray.reduce((prev, current) => {
    let currentDifference = Math.abs(value - current);
    let prevDifference = Math.abs(value - prev);
    return (currentDifference <= prevDifference) ? current : prev;
  });
  return Number.isFinite(result) ? result : NaN;
}
