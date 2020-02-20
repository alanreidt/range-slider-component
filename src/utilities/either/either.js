/**
 * Returns fallback, if origin is falsey (but excluding 0).
 * The values false, null, "", undefined, 0 and NaN are falsey.
 *
 * @param {any} origin The first value to be validated.
 * @param {any} fallback A fallback for the origin.
 *
 * @returns {any} Either origin or fallback.
 */
const either = function eitherFromUtilities(origin, fallback) {
  const isOriginCorrect = origin === 0 || origin;

  return isOriginCorrect ? origin : fallback;
};

export default either;
