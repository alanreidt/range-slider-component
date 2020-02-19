/**
 * Defines whether number is falsey or not.
 * The values which are not a number type and are NaN will return true.
 *
 * @param {number} number A subject of examination.
 */
export function isNumberFalsey(number) {
  return !(typeof number === "number" && !Number.isNaN(number));
}
