export function parseVersion(v: string) {
  return v?.replace(/[@\^~>=]/gi, '');
}
