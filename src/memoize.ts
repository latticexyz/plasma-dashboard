export function memoize<args extends readonly any[], returnValue extends any>(
  fn: (...args: args) => returnValue
): typeof fn {
  const cache = new Map<args[0], returnValue>();
  return function memoizedFn(...args: args): returnValue {
    if (!cache.has(args[0])) {
      cache.set(args[0], fn(...args));
    }
    return cache.get(args[0])!;
  };
}
