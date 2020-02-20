/**
 * Defines whether number is falsey or not.
 * The values which are not a number type and are NaN will return true.
 *
 * @param {number} number A subject of examination.
 */
const isNumberFalsey = function isNumberFalseyFromUtilities(number) {
  return !(typeof number === 'number' && !Number.isNaN(number));
};

export default isNumberFalsey;
