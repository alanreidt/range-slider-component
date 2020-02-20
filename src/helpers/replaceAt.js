import { replaceValueAt } from '../utilities';

/**
 * A wrapper on replaceValueAt utility function
 */
export function replaceAt(index, array) {
  return (value) => replaceValueAt(index, value, array);
}
