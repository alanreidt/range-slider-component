export function getNextDivisibleOf(dividend, divisor, start = 0) {
  divisor = Math.abs(divisor);
  dividend -= start;
  let result = Math.ceil(dividend / divisor) * divisor + start;
  return isFinite(result) ? result : undefined;
}
