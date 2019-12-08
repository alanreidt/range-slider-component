export function getPrevDivisibleOf(dividend, divisor, start = 0) {
  divisor = Math.abs(divisor);
  dividend -= start;
  let result = Math.floor(dividend / divisor) * divisor + start;
  return isFinite(result) ? result : undefined;
}
