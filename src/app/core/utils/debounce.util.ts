export function debounce(cb: () => void, duration = 0) {
  let timeout: NodeJS.Timeout;

  const fn = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    timeout = setTimeout(() => {
      cb();
      timeout = undefined;
    }, duration);
  };

  return fn;
}
