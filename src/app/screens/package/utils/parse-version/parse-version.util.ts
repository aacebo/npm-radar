export function parseVersion(v: string) {
  return v?.replace(/[@\^~>=|]/gi, '').split(' ')[0].trim();
}
