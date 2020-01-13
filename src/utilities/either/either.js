/**
 * Returns either origin or fallback, depending on whether origin is number falsey or not.
 * The values false, null, "", undefined, and NaN are number falsey (in short, it is as falsey, but without 0).
 *
 * @param {any} origin The first value to be validated.
 * @param {any} fallback A fallback for the origin.
 *
 * @returns {any} Either origin or fallback.
 */
export function either(origin, fallback) {
  const isOriginCorrect = origin === 0 || origin;

  return isOriginCorrect ? origin : fallback;
}
