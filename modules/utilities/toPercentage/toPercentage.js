/**
 * Converts number to percentages.
 *
 * @param {number} number A number to convert into percentages.
 *
 * @returns {string} A string, that contains number in percentages.
 */
const toPercentage = function toPercentageFromUtilities(number) {
  const isNumberCorrect = Number.isFinite(number);

  if (!isNumberCorrect) {
    return NaN;
  }

  return `${number * 100}%`;
};

export default toPercentage;
