export function bytesToString(bytes: number, precision = 2) {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;

  if (gb >= 1) {
    return `${gb.toFixed(precision)} GB`;
  } else if (mb >= 1) {
    return `${mb.toFixed(precision)} MB`;
  } else if (kb >= 1) {
    return `${kb.toFixed(precision)} KB`;
  }

  return `${bytes.toFixed(precision)} B`;
}
