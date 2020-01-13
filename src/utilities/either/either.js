export function either(origin, fallback) {
  const isOriginCorrect = origin === 0 || origin;

  return isOriginCorrect ? origin : fallback;
}
