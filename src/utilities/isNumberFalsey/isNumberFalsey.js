/**
 * Defines whether number is number falsey or not.
 * The values false, null, "", undefined, and NaN are number falsey (in short, it is as falsey, but without 0).
 *
 * @param {number} number A subject of examination.
 */
export function isNumberFalsey(number) {
  return !(typeof number === "number" && !Number.isNaN(number));
}
