export function normalizeWeight(v: number, max: number, min: number) {
  return (v - min) / (max - min);
}
