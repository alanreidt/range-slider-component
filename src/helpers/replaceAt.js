import { replaceValueAt } from '../../modules/utilities';

/**
 * A wrapper on replaceValueAt utility function
 */
const replaceAt = function replaceAtFromHelpers(index, array) {
  return (value) => replaceValueAt(index, value, array);
};

export default replaceAt;
