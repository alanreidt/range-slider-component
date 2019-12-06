export function fallbackFalsey(value, fallbackValue) {
  return Number.isNaN(value) ?
    fallbackValue : value;
}
