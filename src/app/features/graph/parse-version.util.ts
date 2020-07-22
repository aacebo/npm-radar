export function parseVersion(v: string) {
  const version = v?.replace(/[@\^~>=|]/gi, '').split(' ')[0].trim();

  if (version.length === 1) {
    return `${version}.0.0`;
  }

  return version;
}
