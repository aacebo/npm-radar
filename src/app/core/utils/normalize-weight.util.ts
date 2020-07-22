export function normalizeWeight(v: number, max: number, min: number) {
  if (v <= max) {
    return (v - min) / (max - min);
  }

  return 1;
}
