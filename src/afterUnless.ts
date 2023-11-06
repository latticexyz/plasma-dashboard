export function afterUnless(
  after: PromiseLike<any>,
  unless: PromiseLike<any>,
  callback: () => void
): Promise<void> {
  return Promise.race([after, unless.then(() => Promise.reject())]).then(
    callback,
    () => {}
  );
}
