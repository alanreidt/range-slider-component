export function getNextDivisibleOf(dividend, divisor, start = 0) {
  const absoluteOfDivisor = Math.abs(divisor);
  dividend -= start;

  const result =
    Math.ceil(dividend / absoluteOfDivisor) * absoluteOfDivisor + start;

  return Number.isFinite(result) ? result : undefined;
}
