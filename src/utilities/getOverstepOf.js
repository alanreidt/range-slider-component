/**
 * Returns excess over step, if this can be done,
 * taking into account starting point.
 * Otherwise, returns undefined.
 *
 * @param {number} value The number which step is compared with.
 * @param {number} step The number that represents a value of step.
 * @param {number} start The number which step starts to counting from.
 * @returns {number} The excess of value over step.
 * @returns {undefined} The Error of operation.
 */
export function getOverstepOf(value, step, start) {
  start = isFinite(start) ? start : 0;
  if ((value < start) || !isFinite(step))
    return;
  let overstep = (value - start) % step;
  return isNaN(overstep) ? undefined : overstep;
}
