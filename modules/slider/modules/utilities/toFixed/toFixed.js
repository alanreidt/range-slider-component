/**
 * Returns a string representing a number in fixed-point notation.
 * Unlike native toFixed method, don't add 0s after the decimal point to an integer.
 *
 * @param {number} number A number to be fixed.
 * @param {number} fractionDigits Number of digits after the decimal point. Must be in the range 0−20, inclusive.
 *
 * @returns {string} A string representing a number in fixed-point notation.
 */
const toFixed = function toFixedFromUtilities(number, fractionDigits = 0) {
  const areArgumentsCorrect =
    typeof number === 'number' && Number.isFinite(fractionDigits);

  if (!areArgumentsCorrect) {
    return 'NaN';
  }

  return number - number.toFixed()
    ? number.toFixed(fractionDigits)
    : String(number);
};

export default toFixed;
