import findClosestDivisible from '../findClosestDivisible';

/**
 * Adjust a value, in order to be divisible by a step.
 * Returns NaN, if operation can't be performed.
 *
 * @param {number} value The value, that to be adjusted.
 * @param {number} step The step, that divides the value.
 * @param {number} offset The offset of a starting point for the step, counting from 0.
 *
 * @returns {number} The adjusted value, that can be divided by the step without remainder.
 */
const adjustValueToStep = function adjustValueToStepFromUtilities(
  value,
  step,
  offset,
) {
  const closestDivisible = findClosestDivisible(value - offset, step);

  return closestDivisible + offset;
};

export default adjustValueToStep;
