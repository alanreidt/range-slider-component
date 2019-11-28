export function getAverageOf(arr) {
  return arr.reduce((sum, current) => sum + current, 0) / arr.length;
}
