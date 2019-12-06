export function fallbackFalsey(value, fallbackValue) {
  return value || fallbackValue;
  // return Number.isNaN(value) ?
  //   fallbackValue : value;
}
